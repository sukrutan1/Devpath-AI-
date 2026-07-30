"""
Career field recommender — ported from the Jupyter notebook's alan_oner() function.
15-question quiz with normalized scoring across 9 software fields.
"""

from server.schemas import QuizSubmission, QuizResult, FieldResult

# ── Alan bilgileri (sonuç sayfasında gösterilecek) ───────────
FIELD_INFO = {
    'Backend': {
        'title': 'Backend Developer',
        'description': 'Your profile shows strong aptitude for server-side logic, API design, and database management. You excel at building robust, scalable systems.',
        'skills': ['Node.js', 'Python', 'SQL'],
        'icon': 'dns',
        'roadmap': 'https://roadmap.sh/backend',
    },
    'Frontend': {
        'title': 'Frontend Developer',
        'description': 'Your profile shows strong aptitude for visual logic, user experience, and component-based architecture. You excel at translating design into interactive realities.',
        'skills': ['React', 'UI/UX', 'CSS'],
        'icon': 'code',
        'roadmap': 'https://roadmap.sh/frontend',
    },
    'Mobile': {
        'title': 'Mobile Developer',
        'description': 'Your profile shows strong aptitude for building mobile-first experiences. You excel at creating smooth, performant apps for iOS and Android.',
        'skills': ['React Native', 'Flutter', 'Swift'],
        'icon': 'smartphone',
        'roadmap': 'https://roadmap.sh/android',
    },
    'DevOps/Cloud': {
        'title': 'DevOps / Cloud Engineer',
        'description': 'Your profile shows strong aptitude for infrastructure automation, CI/CD pipelines, and cloud architecture. You excel at keeping systems running at scale.',
        'skills': ['Docker', 'Kubernetes', 'AWS'],
        'icon': 'cloud',
        'roadmap': 'https://roadmap.sh/devops',
    },
    'Data Science/AI-ML': {
        'title': 'Data Scientist / ML Engineer',
        'description': 'Your profile shows strong aptitude for statistical analysis, model building, and data-driven decisions. You excel at extracting insights from complex datasets.',
        'skills': ['Python', 'TensorFlow', 'Statistics'],
        'icon': 'psychology',
        'roadmap': 'https://roadmap.sh/ai-data-scientist',
    },
    'QA/Test': {
        'title': 'QA / Test Engineer',
        'description': 'Your profile shows strong aptitude for quality assurance, systematic testing, and defect prevention. You excel at ensuring software reliability.',
        'skills': ['Selenium', 'Jest', 'CI/CD'],
        'icon': 'bug_report',
        'roadmap': 'https://roadmap.sh/qa',
    },
    'Cybersecurity': {
        'title': 'Cybersecurity Specialist',
        'description': 'Your profile shows strong aptitude for security analysis, vulnerability assessment, and threat modeling. You excel at protecting systems from attacks.',
        'skills': ['Pen Testing', 'OWASP', 'Cryptography'],
        'icon': 'shield',
        'roadmap': 'https://roadmap.sh/cyber-security',
    },
    'Game Development': {
        'title': 'Game Developer',
        'description': 'Your profile shows strong aptitude for interactive experiences, game mechanics, and real-time rendering. You excel at creating engaging digital worlds.',
        'skills': ['Unity', 'C#', 'Game Design'],
        'icon': 'sports_esports',
        'roadmap': 'https://roadmap.sh/game-developer',
    },
    'Embedded/IoT': {
        'title': 'Embedded / IoT Engineer',
        'description': 'Your profile shows strong aptitude for hardware-software integration, sensor programming, and embedded systems. You bridge the physical and digital worlds.',
        'skills': ['C/C++', 'Arduino', 'RTOS'],
        'icon': 'memory',
        'roadmap': 'https://roadmap.sh/computer-science',
    },
}

# ── 15 soru — notebook'tan birebir aktarılmıştır ─────────────
QUESTIONS = [
    {
        'question': 'What would you prefer to spend the most time on in a project?',
        'category': 'Project Focus',
        'category_icon': 'rocket_launch',
        'options': [
            {'text': "Building server-side business logic and APIs", 'scores': {'Backend': 3, 'DevOps/Cloud': 1}},
            {'text': 'Designing the screens that the user interacts with', 'scores': {'Frontend': 3, 'Mobile': 1}},
            {'text': 'Building models from data and generating predictions', 'scores': {'Data Science/AI-ML': 3}},
            {'text': 'Coding the mechanics of a game', 'scores': {'Game Development': 3}},
        ],
    },
    {
        'question': 'Which environment is more appealing to work in?',
        'category': 'Work Environment',
        'category_icon': 'desktop_windows',
        'options': [
            {'text': 'Cloud infrastructure, servers, and automation pipelines', 'scores': {'DevOps/Cloud': 3, 'Backend': 1}},
            {'text': 'Phone/tablet application development environment', 'scores': {'Mobile': 3}},
            {'text': 'Systems integrated with physical hardware and sensors', 'scores': {'Embedded/IoT': 3}},
            {'text': 'Environment for testing and protecting systems against attacks', 'scores': {'Cybersecurity': 3}},
        ],
    },
    {
        'question': 'What is your first instinct when you encounter a software bug?',
        'category': 'Problem Solving',
        'category_icon': 'bug_report',
        'options': [
            {'text': 'Systematically write test scenarios to catch the bug', 'scores': {'QA/Test': 3}},
            {'text': 'Follow the code logic line by line to find the root cause', 'scores': {'Backend': 2, 'DevOps/Cloud': 1}},
            {'text': 'Look at where it appears incorrectly in the user interface', 'scores': {'Frontend': 2, 'Mobile': 1}},
            {'text': 'Check if there is a security vulnerability', 'scores': {'Cybersecurity': 2, 'QA/Test': 1}},
        ],
    },
    {
        'question': 'Which topic are you most curious about?',
        'category': 'Interests',
        'category_icon': 'lightbulb',
        'options': [
            {'text': 'Artificial intelligence and machine learning models', 'scores': {'Data Science/AI-ML': 3}},
            {'text': 'Game engines and interactive experiences', 'scores': {'Game Development': 3}},
            {'text': 'IoT devices and embedded systems', 'scores': {'Embedded/IoT': 3}},
            {'text': 'Cloud architecture and scalable systems', 'scores': {'DevOps/Cloud': 3}},
        ],
    },
    {
        'question': 'What do you care about most when developing a product?',
        'category': 'Product Focus',
        'category_icon': 'design_services',
        'options': [
            {'text': 'Code performance and database efficiency', 'scores': {'Backend': 3}},
            {'text': 'Fluid and aesthetic user experience', 'scores': {'Frontend': 3, 'Mobile': 1}},
            {'text': 'Testing every scenario and ensuring it runs flawlessly', 'scores': {'QA/Test': 3}},
            {'text': 'Keeping the data secure and private', 'scores': {'Cybersecurity': 3}},
        ],
    },
    {
        'question': 'Which work style suits you best?',
        'category': 'Work Style',
        'category_icon': 'terminal',
        'options': [
            {'text': 'Progressing by doing deep, independent analysis', 'scores': {'Data Science/AI-ML': 2, 'Embedded/IoT': 1}},
            {'text': 'Progressing rapidly with a continuous test-and-build cycle', 'scores': {'Game Development': 2, 'Frontend': 1}},
            {'text': 'Progressing by monitoring and automating systems', 'scores': {'DevOps/Cloud': 2, 'Backend': 1}},
            {'text': 'Writing detailed scenarios and verifying step by step', 'scores': {'QA/Test': 2, 'Cybersecurity': 1}},
        ],
    },
    {
        'question': 'Which of the following excites you the most?',
        'category': 'Motivation',
        'category_icon': 'favorite',
        'options': [
            {'text': 'A mobile app reaching millions of users', 'scores': {'Mobile': 3}},
            {'text': 'A model generating accurate predictions', 'scores': {'Data Science/AI-ML': 3}},
            {'text': 'A system being resilient to attacks', 'scores': {'Cybersecurity': 3}},
            {'text': 'A game being fluid and fun', 'scores': {'Game Development': 3}},
        ],
    },
    {
        'question': 'What motivates you when learning a new technology?',
        'category': 'Learning Style',
        'category_icon': 'school',
        'options': [
            {'text': 'A new server-side framework/API technology', 'scores': {'Backend': 3}},
            {'text': 'A new UI library or design tool', 'scores': {'Frontend': 3}},
            {'text': 'A new test automation tool', 'scores': {'QA/Test': 3}},
            {'text': 'A new hardware/microcontroller platform', 'scores': {'Embedded/IoT': 3}},
        ],
    },
    {
        'question': 'Which question interests you the most in a system?',
        'category': 'System Thinking',
        'category_icon': 'hub',
        'options': [
            {'text': 'How does this system scale to 1 million users?', 'scores': {'DevOps/Cloud': 3}},
            {'text': 'What kind of pattern can we extract from this dataset?', 'scores': {'Data Science/AI-ML': 3}},
            {'text': 'Does this app work properly on all devices?', 'scores': {'QA/Test': 2, 'Mobile': 1}},
            {'text': 'Is there a security vulnerability in this system?', 'scores': {'Cybersecurity': 3}},
        ],
    },
    {
        'question': 'Which type of project appeals to you more?',
        'category': 'Project Type',
        'category_icon': 'folder',
        'options': [
            {'text': 'The backend systems of an e-commerce site', 'scores': {'Backend': 3}},
            {'text': 'The interface and mechanics of a mobile game', 'scores': {'Game Development': 2, 'Mobile': 2}},
            {'text': 'The software for smart home devices', 'scores': {'Embedded/IoT': 3}},
            {'text': 'Managing a company\'s servers in the cloud', 'scores': {'DevOps/Cloud': 3}},
        ],
    },
    {
        'question': 'Which approach do you adopt when solving a problem?',
        'category': 'Problem Solving',
        'category_icon': 'bug_report',
        'options': [
            {'text': 'I analyze the data and make statistical inferences', 'scores': {'Data Science/AI-ML': 3}},
            {'text': 'I list all possible error scenarios and test them', 'scores': {'QA/Test': 3}},
            {'text': 'I think like an attacker and look for weak points', 'scores': {'Cybersecurity': 3}},
            {'text': 'I test the experience from the user\'s perspective', 'scores': {'Frontend': 3}},
        ],
    },
    {
        'question': 'Which technology area attracts you the most?',
        'category': 'Technology',
        'category_icon': 'code',
        'options': [
            {'text': 'Container/orchestration tools like Docker and Kubernetes', 'scores': {'DevOps/Cloud': 3}},
            {'text': 'Interface libraries like React and Vue', 'scores': {'Frontend': 3}},
            {'text': 'Machine learning tools like TensorFlow and PyTorch', 'scores': {'Data Science/AI-ML': 3}},
            {'text': 'Hardware platforms like Arduino and Raspberry Pi', 'scores': {'Embedded/IoT': 3}},
        ],
    },
    {
        'question': 'What role do you see yourself in the long term?',
        'category': 'Career Vision',
        'category_icon': 'trending_up',
        'options': [
            {'text': 'Someone who builds system architecture and manages the background', 'scores': {'Backend': 3}},
            {'text': 'Someone who shapes the user experience', 'scores': {'Mobile': 3}},
            {'text': 'Someone who builds data-driven decision support systems', 'scores': {'Data Science/AI-ML': 3}},
            {'text': 'Someone who ensures the security of systems', 'scores': {'Cybersecurity': 3}},
        ],
    },
    {
        'question': 'Which task do you find more enjoyable?',
        'category': 'Task Style',
        'category_icon': 'task_alt',
        'options': [
            {'text': 'Performing performance tests of an application', 'scores': {'QA/Test': 3}},
            {'text': 'Coding the level design of a game', 'scores': {'Game Development': 3}},
            {'text': 'Writing code that processes data from a sensor', 'scores': {'Embedded/IoT': 3}},
            {'text': 'Optimizing the database queries of an API', 'scores': {'Backend': 3}},
        ],
    },
    {
        'question': 'What do you want to be remembered for most in your career?',
        'category': 'Career Vision',
        'category_icon': 'trending_up',
        'options': [
            {'text': 'A mobile app used by millions of users', 'scores': {'Mobile': 3}},
            {'text': 'An innovative artificial intelligence product', 'scores': {'Data Science/AI-ML': 3}},
            {'text': 'A flawlessly tested, reliable system', 'scores': {'QA/Test': 3}},
            {'text': 'Large-scale, continuously running cloud infrastructure', 'scores': {'DevOps/Cloud': 3}},
        ],
    },
]

FIELDS = list(FIELD_INFO.keys())


def get_quiz_questions() -> list[dict]:
    """Return quiz questions in frontend-friendly format."""
    result = []
    for i, q in enumerate(QUESTIONS):
        result.append({
            'index': i,
            'question': q['question'],
            'category': q['category'],
            'category_icon': q['category_icon'],
            'options': [
                {'key': j + 1, 'text': opt['text']}
                for j, opt in enumerate(q['options'])
            ],
        })
    return result


def calculate_recommendation(submission: QuizSubmission) -> QuizResult:
    """Calculate field recommendation from quiz answers."""
    scores = {field: 0 for field in FIELDS}

    # ── Her alan için teorik maksimum puanı hesapla ──────────
    max_scores = {field: 0 for field in FIELDS}
    for q in QUESTIONS:
        for field in FIELDS:
            best = max(opt['scores'].get(field, 0) for opt in q['options'])
            max_scores[field] += best

    # ── Kullanıcının puanlarını hesapla ──────────────────────
    for i, answer in enumerate(submission.answers):
        if 1 <= answer <= 4:
            chosen = QUESTIONS[i]['options'][answer - 1]
            for field, pts in chosen['scores'].items():
                scores[field] += pts

    # ── Normalize (yüzdeye çevir) ────────────────────────────
    percentages = {}
    for field in FIELDS:
        if max_scores[field] > 0:
            percentages[field] = round((scores[field] / max_scores[field]) * 100, 1)
        else:
            percentages[field] = 0.0

    # ── Sırala ───────────────────────────────────────────────
    sorted_fields = sorted(percentages.items(), key=lambda x: x[1], reverse=True)
    top_field = sorted_fields[0][0]
    alt_field = sorted_fields[1][0]

    info = FIELD_INFO[top_field]

    field_results = [
        FieldResult(
            name=field,
            percentage=pct,
            raw_score=scores[field],
            max_score=max_scores[field],
        )
        for field, pct in sorted_fields
    ]

    return QuizResult(
        recommended_field=info['title'],
        description=info['description'],
        skills=info['skills'],
        icon=info['icon'],
        percentages=field_results,
        roadmap_link=info['roadmap'],
        alternative_field=FIELD_INFO[alt_field]['title'],
        alternative_percentage=sorted_fields[1][1],
    )
