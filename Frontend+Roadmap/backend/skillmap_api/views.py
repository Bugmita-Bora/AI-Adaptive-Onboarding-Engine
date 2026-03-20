import json
import anthropic
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


SYSTEM_PROMPT = """You are an expert talent analyst and learning designer.
Analyze the resume and job description provided, then return ONLY a valid JSON object.
No markdown, no explanation, no backticks. Pure JSON only."""

ANALYSIS_PROMPT = """Analyze the resume and job description below, then return ONLY a JSON object with this exact structure:

{{
  "candidate_name": "string (extract from resume or use 'Candidate')",
  "role_title": "string (extract from JD)",
  "years_experience": number,
  "match_percent": number (0-100, realistic assessment),
  "skills_have": [
    {{"name": "string", "level": "beginner|intermediate|advanced"}}
  ],
  "skills_gap": [
    {{"name": "string", "priority": "high|medium|low"}}
  ],
  "skills_partial": [
    {{"name": "string", "note": "brief explanation"}}
  ],
  "roadmap": [
    {{
      "title": "string",
      "description": "2-3 sentence explanation",
      "priority": "high|medium|low",
      "duration_weeks": number,
      "tags": ["string"]
    }}
  ]
}}

Guidelines:
- skills_have: skills the candidate already has at a good level
- skills_gap: skills required by JD but missing from resume
- skills_partial: skills present but below required level
- roadmap: ordered learning modules to close the skill gap, most critical first
- match_percent: honest % of how well candidate matches the role right now

RESUME:
{resume}

JOB DESCRIPTION:
{jd}"""


def build_prompt(resume_text, jd_text):
    return ANALYSIS_PROMPT.format(resume=resume_text, jd=jd_text)


@api_view(['GET'])
def health(request):
    """Health check endpoint."""
    return Response({'status': 'ok', 'service': 'SkillMap API'})


@api_view(['POST'])
def analyze(request):
    """
    POST /api/analyze/
    Body: { "resume_text": "...", "jd_text": "..." }
    Returns: full skill gap analysis JSON
    """
    resume_text = request.data.get('resume_text', '').strip()
    jd_text     = request.data.get('jd_text', '').strip()

    if not resume_text:
        return Response(
            {'error': 'resume_text is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    if not jd_text:
        return Response(
            {'error': 'jd_text is required'},
            status=status.HTTP_400_BAD_REQUEST
        )

    api_key = settings.ANTHROPIC_API_KEY
    if not api_key:
        return Response(
            {'error': 'Anthropic API key not configured on server. Set ANTHROPIC_API_KEY in backend/.env'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    try:
        client = anthropic.Anthropic(api_key=api_key)

        message = client.messages.create(
            model='claude-sonnet-4-20250514',
            max_tokens=2000,
            system=SYSTEM_PROMPT,
            messages=[
                {
                    'role': 'user',
                    'content': build_prompt(resume_text, jd_text)
                }
            ]
        )

        raw = message.content[0].text.strip()

        # Strip any accidental markdown fences
        if raw.startswith('```'):
            raw = raw.split('```')[1]
            if raw.startswith('json'):
                raw = raw[4:]
            raw = raw.strip()

        result = json.loads(raw)
        return Response(result, status=status.HTTP_200_OK)

    except json.JSONDecodeError as e:
        return Response(
            {'error': f'Failed to parse AI response as JSON: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    except anthropic.AuthenticationError:
        return Response(
            {'error': 'Invalid Anthropic API key. Check your backend/.env file.'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    except anthropic.RateLimitError:
        return Response(
            {'error': 'Anthropic rate limit reached. Please try again in a moment.'},
            status=status.HTTP_429_TOO_MANY_REQUESTS
        )
    except Exception as e:
        return Response(
            {'error': f'Analysis failed: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
