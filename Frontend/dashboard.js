// ═══════════════════════════════════════════════════════════
//  KETI 7대 전략기술 역량 대시보드 — dashboard.js
//  통합 데이터 모델 + 양방향 연계 렌더링
// ═══════════════════════════════════════════════════════════

// ─── 연구센터 풀 (고정 목록) ─────────────────────────────
const CENTER_POOL = [
  'AI기반모델','복합지능','정보미디어','자율지능시스템','콘텐츠응용',
  '자율형IoT','지능융합SW','AI융합가전','IT응용','산업데이터융합',
  '스마트전장','SoC플랫폼','지능형반도체디바이스','ICT나노융합',
  '모빌리티플랫폼','스마트센서','융합신호SoC','에너지IT융합',
  '메디컬IT융합','스마트네트워크','XR융합플랫폼','홀로그램',
  '자율제조','지능로보틱스','지능메카트로닉스','IT융합시스템',
  'ICT디바이스·패키징','융복합전자소재','에너지변환','차세대전지',
  '디지털혁신지원','신뢰성'
].sort();

// ─── 통합 데이터 모델 ────────────────────────────────────
// techs 배열: 문자열 → 객체 (트렌드 카드 상세정보 포함)
// caps 배열: { title, image } (이미지+제목, 여러 개 가능)
const DEFAULT_MAP_DATA = {
  core: [
    { id:'c_learn', name:'학습지능', count:53,
      centers:['AI기반모델','정보미디어','모빌리티플랫폼','콘텐츠응용','IT응용','산업데이터융합','스마트전장','자율형IoT','SoC플랫폼','지능형반도체디바이스','ICT나노융합'],
      mgr_a:'신사임', mgr_b:'금승우',
      techs:[
        { id:'ct_ml', title:'머신러닝', asis:'객체 인식, 추적, 생성', tobe:'학습되지 않은 개체 인식',
          caps:[{title:'학습데이터 기반 객체인식',image:'../Image/AI/AI 핵심기술/학습데이터 기반 객체인식.png'},{title:'크로스모달 상호참조',image:'../Image/AI/AI 핵심기술/크로스모달 상호참조.png'},{title:'웹규모 개체인식',image:'../Image/AI/AI 핵심기술/웹규모 개체인식.png'}],
          centers:['AI기반모델','정보미디어','모빌리티플랫폼','콘텐츠응용'], mgr_a:'신사임', mgr_b:'금승우'},
        { id:'ct_gen', title:'생성 AI 모델 연구', asis:'확산모델 기반 데이터 편집·생성', tobe:'소량데이터 기반 모델 일반화',
          caps:[{title:'AI 데이터 전처리 플랫폼',image:'../Image/AI/AI 핵심기술/AI 데이터 전처리 플랫폼.png'},{title:'콘텐츠 개인화',image:'../Image/AI/AI 핵심기술/콘텐츠 개인화.png'},{title:'Diffusion Model 알고리즘 개선',image:'../Image/AI/AI 핵심기술/Diffusion Model 알고리즘 개선.png'}],
          centers:['AI기반모델','IT응용','산업데이터융합'], mgr_a:'신사임', mgr_b:'이영한'},
        { id:'ct_reason', title:'추론·지식표현', asis:'규칙 기반 지식 표현·추론', tobe:'신경-기호 통합 지식 추론',
          caps:[{title:'지식 그래프 구축',image:null},{title:'논리 기반 추론 엔진',image:null},{title:'상식 추론 모델',image:null}],
          centers:['AI기반모델','복합지능','정보미디어'], mgr_a:'신사임', mgr_b:'금승우'},
        { id:'ct_snn', title:'스파이킹 신경망 학습', asis:'GPU 기반 딥러닝 계산', tobe:'SNN 기반 뇌모사 저전력 학습',
          caps:[{title:'STDP 기반 SNN 학습',image:null},{title:'이벤트 기반 신경망',image:null},{title:'SNN 시뮬레이터',image:null}],
          centers:['AI기반모델','지능형반도체디바이스'], mgr_a:'신사임', mgr_b:'금승우'}
      ]},
    { id:'c_single', name:'단일지능', count:45,
      centers:['AI기반모델','복합지능','정보미디어','모빌리티플랫폼','콘텐츠응용','IT응용','산업데이터융합','자율형IoT','지능융합SW','ICT나노융합'],
      mgr_a:'신사임', mgr_b:'이영한',
      techs:[
        { id:'ct_audio', title:'청각지능', asis:'소용량 음성 생성 (15분 분량)', tobe:'Zero-shot 음성 생성 (10초 기반)',
          caps:[{title:'고품질 음성 생성',image:'../Image/AI/AI 핵심기술/고품질 음성 생성.jpg'},{title:'다국어 변환',image:'../Image/AI/AI 핵심기술/다국어 변환.png'},{title:'한국어 가창 합성',image:'../Image/AI/AI 핵심기술/한국어 가창 합성.png'}],
          centers:['AI기반모델','복합지능','콘텐츠응용'], mgr_a:'신사임', mgr_b:'이영한'},
        { id:'ct_visual', title:'시각지능', asis:'도메인 특화 이해/생성', tobe:'자가성장 기반 이해/생성',
          caps:[{title:'실사 디지털 휴먼',image:'../Image/AI/AI 핵심기술/실사 디지털 휴먼.png'},{title:'미디어 자동 제작',image:'../Image/AI/AI 핵심기술/미디어 자동 제작.png'},{title:'다중 객체 탐지·예측',image:'../Image/AI/AI 핵심기술/다중 객체 탐지 및 예측.png'}],
          centers:['AI기반모델','복합지능','정보미디어'], mgr_a:'신사임', mgr_b:'이영한'},
        { id:'ct_lang', title:'언어지능', asis:'한국어 특화 NLP 모델', tobe:'멀티링구얼 거대언어모델 (LLM)',
          caps:[{title:'한국어 LLM',image:null},{title:'자연어처리 플랫폼',image:null},{title:'대화 시스템',image:null}],
          centers:['AI기반모델','복합지능'], mgr_a:'신사임', mgr_b:'이영한'},
        { id:'ct_tactile', title:'촉각물리지능', asis:'기계적 촉각 센서 신호 처리', tobe:'AI 기반 촉각·물리 상호작용 지능',
          caps:[{title:'촉각 센서 인터페이스',image:null},{title:'물리 시뮬레이션',image:null},{title:'역각 제어',image:null}],
          centers:['AI기반모델','복합지능'], mgr_a:'신사임', mgr_b:'이영한'}
      ]},
    { id:'c_complex', name:'복합지능', count:56,
      centers:['AI기반모델','복합지능','정보미디어','자율지능시스템','콘텐츠응용','자율형IoT','지능융합SW','AI융합가전','IT응용'],
      mgr_a:'신사임', mgr_b:'이영한',
      techs:[
        { id:'ct_agent', title:'지능형 에이전트', asis:'정보검색 및 대화 에이전트', tobe:'자율적 지능형 협업 에이전트',
          caps:[{title:'개성(Persona) 에이전트',image:'../Image/AI/AI 핵심기술/개성(Persona) 에이전트.png'},{title:'대화형 에이전트 시스템',image:'../Image/AI/AI 핵심기술/대화형 에이전트 시스템.png'},{title:'Agentic LLM',image:'../Image/AI/AI 핵심기술/Agentic LLM.png'}],
          centers:['복합지능','AI기반모델','자율지능시스템'], mgr_a:'신사임', mgr_b:'이영한'},
        { id:'ct_behavior', title:'행동·사회지능', asis:'단순 행동 패턴 인식', tobe:'사회적 맥락 기반 행동 예측·이해',
          caps:[{title:'행동 패턴 분석',image:null},{title:'사회적 상호작용 모델',image:null},{title:'그룹 행동 예측',image:null}],
          centers:['복합지능','AI기반모델'], mgr_a:'신사임', mgr_b:'이영한'},
        { id:'ct_emotion', title:'상황·감정이해', asis:'단일 모달 감정 인식', tobe:'멀티모달 상황·감정 통합 이해',
          caps:[{title:'멀티모달 감정 분석',image:null},{title:'맥락 인식 모델',image:null},{title:'감정 기반 서비스',image:null}],
          centers:['복합지능','AI기반모델','콘텐츠응용'], mgr_a:'신사임', mgr_b:'이영한'},
        { id:'ct_agi', title:'범용 인공지능', asis:'도메인 특화 단일 목적 AI', tobe:'자율적 범용 목적 AI 에이전트',
          caps:[{title:'Foundation Model 연구',image:null},{title:'AGI 아키텍처',image:null},{title:'자율 학습 시스템',image:null}],
          centers:['AI기반모델','복합지능','자율지능시스템'], mgr_a:'신사임', mgr_b:'이영한'}
      ]},
    { id:'c_edge', name:'엣지 AI', count:35,
      centers:['정보미디어','지능형반도체디바이스','자율형IoT','복합지능','SoC플랫폼','스마트네트워크','콘텐츠응용','XR융합플랫폼','지능융합SW','AI융합가전'],
      mgr_a:'금승우', mgr_b:'장성준',
      techs:[
        { id:'ct_edge1', title:'초경량 엣지AI 모델', asis:'클라우드 기반 대형 AI 모델', tobe:'초경량 온디바이스 AI 추론',
          caps:[{title:'모델 경량화',image:null},{title:'지식 증류',image:null},{title:'양자화 기술',image:null}],
          centers:['정보미디어','지능형반도체디바이스'], mgr_a:'금승우', mgr_b:'장성준'},
        { id:'ct_edge2', title:'엣지AI 학습', asis:'서버 집중형 AI 학습', tobe:'온디바이스 연합·적응형 학습',
          caps:[{title:'연합 학습 프레임워크',image:null},{title:'적응형 파인튜닝',image:null},{title:'프라이버시 보존 학습',image:null}],
          centers:['정보미디어','지능형반도체디바이스'], mgr_a:'금승우', mgr_b:'장성준'},
        { id:'ct_edge3', title:'엣지AI 프레임워크', asis:'특정 하드웨어 종속 AI 런타임', tobe:'이기종 엣지 장치 통합 AI 프레임워크',
          caps:[{title:'크로스플랫폼 AI 런타임',image:null},{title:'엣지-클라우드 연동',image:null},{title:'하드웨어 추상화',image:null}],
          centers:['정보미디어','지능형반도체디바이스'], mgr_a:'금승우', mgr_b:'장성준'},
        { id:'ct_edge4', title:'적응형 엣지 지능 관리', asis:'정적 규칙 기반 엣지 관리', tobe:'상황인식 기반 자율 엣지 지능 관리',
          caps:[{title:'자율 자원 관리',image:null},{title:'동적 AI 모델 배포',image:null},{title:'엣지 오케스트레이션',image:null}],
          centers:['정보미디어','지능형반도체디바이스'], mgr_a:'금승우', mgr_b:'장성준'}
      ]},
    { id:'c_ethics', name:'AI 윤리·안전', count:19,
      centers:['복합지능','AI기반모델','콘텐츠응용'],
      mgr_a:'이영한', mgr_b:'조충상',
      techs:[
        { id:'ct_deepfake', title:'딥페이크 탐지', asis:'정적 구조의 딥페이크 탐지', tobe:'능동적 구조의 딥페이크 탐지',
          caps:[{title:'딥페이크 영상 탐지',image:null},{title:'딥페이크 오디오 탐지',image:null},{title:'딥페이크 탐지 분석/설명',image:null}],
          centers:['복합지능','AI기반모델','콘텐츠응용'], mgr_a:'이영한', mgr_b:'조충상'},
        { id:'ct_align', title:'인공지능 정렬', asis:'규칙 기반 AI 안전 제약', tobe:'인간 가치 정렬 AI 시스템',
          caps:[{title:'RLHF 기반 정렬',image:null},{title:'안전 학습 알고리즘',image:null},{title:'가치 정렬 평가 프레임워크',image:null}],
          centers:['복합지능','AI기반모델'], mgr_a:'이영한', mgr_b:'조충상'},
        { id:'ct_xai', title:'설명가능 인공지능', asis:'블랙박스 AI 결과 제공', tobe:'투명하고 해석 가능한 AI 의사결정',
          caps:[{title:'Explainable AI',image:'../Image/AI/AI 핵심기술/Explainable AI.png'},{title:'의사결정 근거 시각화',image:null},{title:'해석 가능 모델',image:null}],
          centers:['복합지능','AI기반모델','콘텐츠응용'], mgr_a:'이영한', mgr_b:'조충상'},
        { id:'ct_trust', title:'신뢰가능한 AI 보안', asis:'사후 대응형 AI 보안', tobe:'선제적 AI 공격·취약점 방어',
          caps:[{title:'적대적 공격 방어',image:null},{title:'AI 모델 보안 평가',image:null},{title:'프라이버시 보호 AI',image:null}],
          centers:['복합지능','AI기반모델'], mgr_a:'이영한', mgr_b:'조충상'}
      ]}
  ],
  base: [
    { id:'b_semi', name:'AI 반도체', count:48,
      centers:['SoC플랫폼','지능형반도체디바이스','융합신호SoC','ICT나노융합','신뢰성','스마트센서','산업데이터융합'],
      mgr_a:'김병수', mgr_b:'장성준',
      techs:[
        { id:'bt_neuro', title:'뉴로모픽 반도체', asis:'단순 뇌구조 모방, 추론 중심 반도체로 활용성 낮음', tobe:'뇌 기반 온칩 학습 기술로 실생활 활용 확대',
          caps:[{title:'STDP SNN 반도체',image:null},{title:'Hybrid SNN 반도체',image:null},{title:'이벤트 카메라 SNN 응용',image:null}],
          centers:['SoC플랫폼','지능형반도체디바이스','ICT나노융합'], mgr_a:'김병수', mgr_b:'장성준'},
        { id:'bt_ondevice', title:'엣지용 온디바이스 AI 반도체', asis:'서버 중심 고성능 AI 반도체, 학습 불가한 온디바이스 반도체', tobe:'온디바이스 학습·추론 반도체, 저전력 구현',
          caps:[{title:'NPU 코어 설계',image:null},{title:'온디바이스 추론 최적화',image:null},{title:'이기종 집적 Chip',image:null}],
          centers:['SoC플랫폼','지능형반도체디바이스'], mgr_a:'김병수', mgr_b:'장성준'},
        { id:'bt_server', title:'서버향 AI 추론 반도체', asis:'메모리 대역폭으로 인한 속도 저하, 비선형 함수 연산속도 저하', tobe:'다종 메모리 기반 LLM 모델 가속 솔루션',
          caps:[{title:'다종 메모리 연결구조 LLM 가속',image:null},{title:'하드웨어 플랫폼 제어 API',image:null},{title:'최신 함수 가속 HW IP',image:null}],
          centers:['SoC플랫폼','지능형반도체디바이스','ICT나노융합'], mgr_a:'김병수', mgr_b:'장성준'}
      ]},
    { id:'b_sensor', name:'AI 센서', count:52,
      centers:['스마트센서','융합신호SoC','에너지IT융합','메디컬IT융합','ICT나노융합','스마트네트워크'],
      mgr_a:'차철웅', mgr_b:'이성호',
      techs:[
        { id:'bt_sw_sensor', title:'소프트웨어 센서', asis:'물리 센서에 의존한 계측, 설치 비용 부담·고장 시 계측 중단', tobe:'데이터 기반 지능형 계측, 물리 센서 대체·보완',
          caps:[{title:'WiFi CSI 기반 재실 감지 SW 센서',image:null},{title:'전력소비 기반 재실자수 감지',image:null},{title:'스마트폰 기반 수면 감지',image:null}],
          centers:['스마트센서','융합신호SoC','ICT나노융합'], mgr_a:'차철웅', mgr_b:'이성호'},
        { id:'bt_bio_sensor', title:'무자각 바이오헬스 센서', asis:'착용형·분리형 바이오헬스 센서 중심의 계측', tobe:'비접촉·삽입형 바이오헬스 센서, 바이오칩+AI 융합 분석',
          caps:[{title:'웨어러블 바이오헬스 센서',image:null},{title:'바이오칩 회로·분석',image:null},{title:'SW 분리형 센서',image:null}],
          centers:['스마트센서','메디컬IT융합','ICT나노융합'], mgr_a:'차철웅', mgr_b:'이성호'}
      ]},
    { id:'b_cloud', name:'클라우드', count:33,
      centers:['메디컬IT융합','SoC플랫폼','지능형반도체디바이스','정보미디어','에너지IT융합','자율형IoT','지능융합SW'],
      mgr_a:'김영환', mgr_b:'김병수',
      techs:[
        { id:'bt_autoai', title:'자동화 AI 플랫폼 기술', asis:'수집/학습/배포/분석 수동 구성, 재현성·관리성 낮음', tobe:'End-to-End 자동화 파이프라인, 높은 재현성·확장성',
          caps:[{title:'MLOps 시스템 Stack',image:null},{title:'E2E 자동화 파이프라인',image:null},{title:'엣지 기반 복합 성능 분석 플랫폼',image:null}],
          centers:['메디컬IT융합','SoC플랫폼','정보미디어'], mgr_a:'김영환', mgr_b:'김병수'},
        { id:'bt_distrib', title:'이종 AI 반도체 분산추론', asis:'GPU 활용으로 인한 대규모 전력 소모 및 TCO 증가', tobe:'NPU/PIM/DPU 등 이종 AI 반도체 특성에 최적화된 분산추론',
          caps:[{title:'시스템 모델링 프레임워크',image:null},{title:'연산 스케쥴러 개발',image:null},{title:'이종 디바이스 MoE 최적화',image:null}],
          centers:['SoC플랫폼','지능형반도체디바이스','정보미디어'], mgr_a:'김영환', mgr_b:'김병수'}
      ]},
    { id:'b_twin', name:'디지털트윈', count:36,
      centers:['자율지능시스템','에너지IT융합','콘텐츠응용','모빌리티플랫폼','IT응용','XR융합플랫폼'],
      mgr_a:'이상신', mgr_b:'이상엽',
      techs:[
        { id:'bt_dtfr', title:'디지털트윈 생성 프레임워크', asis:'필요 서비스마다 신규 디지털트윈을 구축하는 반복적 개발', tobe:'플랫폼 중심으로 기구축 디지털트윈 활용·관리',
          caps:[{title:'디지털트윈 플랫폼 기술',image:null},{title:'시공간 동기화 기술',image:null},{title:'디지털트윈 지능 공유 기술',image:null}],
          centers:['자율지능시스템','콘텐츠응용','모빌리티플랫폼'], mgr_a:'이상신', mgr_b:'이상엽'},
        { id:'bt_fedtwin', title:'연합 트윈', asis:'단일 디지털트윈의 개별 운용, 이종 DT 간 연계 어려움', tobe:'이종 디지털트윈 간 연계 지원, 다차원 정보 검색',
          caps:[{title:'트윈 메타데이터 관리',image:null},{title:'연합 객체 생성 프레임워크',image:null},{title:'지능형 동기화 엔진',image:null}],
          centers:['자율지능시스템','콘텐츠응용','IT융합시스템'], mgr_a:'이상신', mgr_b:'이상엽'}
      ]},
    { id:'b_data', name:'데이터', count:44,
      centers:['정보미디어','지능융합SW','AI기반모델','자율지능시스템','에너지IT융합','IT응용','콘텐츠응용','자율제조'],
      mgr_a:'금승우', mgr_b:'강정훈',
      techs:[
        { id:'bt_dataproc', title:'현장-AI 데이터처리 자동화', asis:'현장 데이터와 AI 모델학습 단절', tobe:'산업데이터의 AI 데이터화 완전 자동화',
          caps:[{title:'모델 자동 최적화 SW 플랫폼',image:null},{title:'전처리 자동화 SW 플랫폼',image:null},{title:'연산자 기반 SW 연동',image:null}],
          centers:['정보미디어','지능융합SW','AI기반모델','자율형IoT'], mgr_a:'금승우', mgr_b:'강정훈'},
        { id:'bt_bigdata', title:'빅데이터 활용도 개선', asis:'데이터 드리프트 대응 미흡, 빅데이터 카탈로그 관리 어려움', tobe:'Data Drift 판단 기술, 빅데이터 활용도 개선',
          caps:[{title:'빅데이터 스트리밍 분석',image:null},{title:'데이터 카탈로그 관리',image:null},{title:'Data Drift 판단 기술',image:null}],
          centers:['정보미디어','지능융합SW','AI기반모델'], mgr_a:'금승우', mgr_b:'강정훈'},
        { id:'bt_augment', title:'데이터 증강 기술', asis:'데이터 수량 확보를 위한 단순 증강, 증강 데이터 품질 보완 부재', tobe:'Data Lake 구성, 멀티모달 데이터 처리·분석 관리',
          caps:[{title:'도메인 데이터 관리',image:null},{title:'데이터 증식·탐색',image:null},{title:'Legal Data 관계 분석',image:null}],
          centers:['AI기반모델','정보미디어'], mgr_a:'금승우', mgr_b:'강정훈'},
        { id:'bt_motion', title:'휴먼 모션 데이터', asis:'행동 데이터 사전학습 기반 실시간 예측 정확도 제한', tobe:'개인화된 모션 생성, 맞춤형 아바타 실시간 생성 기술',
          caps:[{title:'Motion Transformer',image:null},{title:'MOST',image:null},{title:'Motion Styler',image:null}],
          centers:['AI기반모델','콘텐츠응용'], mgr_a:'금승우', mgr_b:'강정훈'}
      ]}
  ],
  fusion_left: [
    { id:'f_robot', name:'로봇', count:60,
      centers:['지능로보틱스','지능메카트로닉스','지능형반도체디바이스','자율형IoT','자율제조','IT응용'],
      mgr_a:'황정훈', mgr_b:'서정무',
      techs:[
        { id:'ft_robot1', title:'로봇학습·지능증강', asis:'LLM/VLM 기반 단순 작업 추론, 제한된 환경에서 단순 파지·이송', tobe:'LLM/VLM 파운데이션 모델 멀티모달 VLA 기반 지능 증강',
          caps:[{title:'VLM 기반 생활지원 로봇',image:null},{title:'VLM 기반 제조공정 로봇',image:null},{title:'멀티모달 기반 자율조작',image:null}],
          centers:['지능로보틱스','지능메카트로닉스'], mgr_a:'황정훈', mgr_b:'서정무'},
        { id:'ft_robot2', title:'로봇 자율주행·작업', asis:'단위 임무 기반 주행·작업 지능', tobe:'생성형 주행·작업 지능, 목적 달성 자율 임무 생성·수행',
          caps:[{title:'AMM 협력 지능',image:null},{title:'로봇 다중협력 주행',image:null},{title:'고난도 조립 로봇',image:null}],
          centers:['지능로보틱스','지능메카트로닉스'], mgr_a:'황정훈', mgr_b:'서정무'},
        { id:'ft_robot3', title:'로봇 협업·원격제어', asis:'인간 관리하의 협업 작업, 공유제어 기반 조건부 협업', tobe:'로봇 AI 에이전트 주도하의 자율 협업',
          caps:[{title:'비가시권 공유제어',image:null},{title:'휴머노이드 원격제어',image:null},{title:'로봇 협업작업 지능',image:null}],
          centers:['지능로보틱스','지능메카트로닉스'], mgr_a:'황정훈', mgr_b:'서정무'},
        { id:'ft_robot4', title:'Physical AI·Embodied AI', asis:'시각기반 월드모델 및 행동 생성 지능, Nvidia 코스모스 수준', tobe:'인간이상의 초감각 기반 피지컬 AI',
          caps:[{title:'휴머노이드 시스템',image:null},{title:'온디바이스향 로봇 AI',image:null},{title:'로봇 Sim2Real',image:null}],
          centers:['지능로보틱스','지능메카트로닉스'], mgr_a:'황정훈', mgr_b:'서정무'}
      ]},
    { id:'f_mobility', name:'모빌리티', count:64,
      centers:['모빌리티플랫폼','스마트전장','지능형반도체디바이스','자율형IoT','IT융합시스템','IT응용'],
      mgr_a:'박부식', mgr_b:'조현창',
      techs:[
        { id:'ft_mob1', title:'객체인지·경로 판단·예측', asis:'카메라+라이다 2D/3D 객체인식, Rule 기반 경로 판단', tobe:'Fusion BEV & Prediction, Mapless E2E 자율주행',
          caps:[{title:'BEV 3D Detection',image:null},{title:'Map Generation',image:null},{title:'Motion Prediction',image:null}],
          centers:['모빌리티플랫폼','스마트전장'], mgr_a:'박부식', mgr_b:'조현창'},
        { id:'ft_mob2', title:'자율주행 학습·시뮬레이션', asis:'수동 시나리오 기반 자율차 단일 검증, 모듈러 알고리즘 개별 기능 검증', tobe:'다중 실차 연계 Lv4 가상 검증, E2E SIM2Real Feed-back',
          caps:[{title:'Sensor Emulation',image:null},{title:'Photo-Realistic 가상환경',image:null},{title:'E2E SIM2Real 검증',image:null}],
          centers:['모빌리티플랫폼','스마트전장'], mgr_a:'박부식', mgr_b:'조현창'}
      ]},
    { id:'f_manuf', name:'자율제조', count:41,
      centers:['자율제조','지능융합SW','지능로보틱스','IT응용','에너지IT융합','산업데이터융합'],
      mgr_a:'송병훈', mgr_b:'강정훈',
      techs:[
        { id:'ft_manuf1', title:'공정·장비 특화 솔루션', asis:'딥러닝 공정·장비 데이터 학습, 정형 시계열 데이터 기반 최적화', tobe:'공정 자율학습 초거대 AI, 자가 학습 공정·장비 성능 판단',
          caps:[{title:'장비 동작 판단 AI',image:null},{title:'공정판단 AI',image:null},{title:'공정 빅데이터 분석',image:null}],
          centers:['자율제조','지능융합SW'], mgr_a:'송병훈', mgr_b:'강정훈'},
        { id:'ft_manuf2', title:'제품 R&D 시뮬레이션', asis:'공정 물리 시뮬레이션, 디지털 트윈 기반 공정문제 해결', tobe:'자율 실험 에이전트 AI, 자율 실험 계획 수립 이론지능',
          caps:[{title:'물리 시뮬레이션 공정 가상화',image:null},{title:'시뮬레이션 AI',image:null},{title:'공정 설계 자동화',image:null}],
          centers:['자율제조','지능융합SW','지능로보틱스'], mgr_a:'송병훈', mgr_b:'강정훈'}
      ]},
    { id:'f_telecom', name:'통신·전파', count:25,
      centers:['ICT디바이스·패키징','융복합전자소재','ICT나노융합','스마트네트워크','융합신호SoC'],
      mgr_a:'김동수', mgr_b:'유명재',
      techs:[
        { id:'ft_tel1', title:'AI 기반 빔포밍 모듈 고장진단', asis:'인력 투입 수리, 고비용 유지보수 비용 발생', tobe:'AI 기술을 활용한 빔포밍 결함 실시간 감지·빔 재구성',
          caps:[{title:'타일형 빔포밍 모듈',image:null},{title:'실시간 빔패턴 모니터링 보드',image:null},{title:'실시간 고장진단 알고리즘',image:null}],
          centers:['ICT디바이스·패키징','융복합전자소재'], mgr_a:'김동수', mgr_b:'유명재'},
        { id:'ft_tel2', title:'AI 기반 RF 부품 설계 자동화', asis:'전문가 경험 의존 반복적 튜닝 설계, 개발 기간 및 비용 증가', tobe:'데이터 기반 생성 모델·딥러닝 알고리즘 활용 설계 자동화',
          caps:[{title:'능·수동 회로 설계 기술',image:null},{title:'학습기반 성능 최적화',image:null},{title:'AI 기반 설계 자동화',image:null}],
          centers:['ICT디바이스·패키징','융복합전자소재'], mgr_a:'김동수', mgr_b:'유명재'},
        { id:'ft_tel3', title:'AI 기반 통신시스템 (6G)', asis:'무선 자원 비효율화·수동화, 이기종 무선망 무선접속 비효율', tobe:'실시간 사용자 요구 예측 최적 서비스, 무선통신·센싱 동시화',
          caps:[{title:'이기종 무선망 성능 최적화',image:null},{title:'무선 자원 효율적 자율 최적화',image:null},{title:'상황인지 기술',image:null}],
          centers:['ICT디바이스·패키징','스마트네트워크','융합신호SoC'], mgr_a:'김동수', mgr_b:'유명재'}
      ]}
  ],
  fusion_right: [
    { id:'f_energy', name:'에너지', count:26,
      centers:['에너지IT융합','에너지변환','스마트전장','IT응용','지능메카트로닉스','차세대전지'],
      mgr_a:'이상엽', mgr_b:'지영민',
      techs:[
        { id:'ft_en1', title:'AI BEMS', asis:'사일로 건물 시스템 (BAS, EMS, HVAC 등) 개별 독립 운영', tobe:'표준 AI 자율운전 건물 시스템, 공간별 상황인지 기반 자율운전',
          caps:[{title:'AI 자율운전 환경·에너지 지능형 서비스',image:null},{title:'국제 표준 기반 상호운영성',image:null},{title:'딥러닝 시각지능·빅데이터 플랫폼',image:null}],
          centers:['에너지IT융합','에너지변환'], mgr_a:'이상엽', mgr_b:'지영민'},
        { id:'ft_en2', title:'AI 기반 차세대전지 소재 개발', asis:'실험 기반 분자구조단위 단일구조 물질 최적화', tobe:'멀티스케일 기반 가상소재설계, 소재예측 및 후보물질 발굴',
          caps:[{title:'실시간 발전량 예측 AI 모델',image:null},{title:'AI 전력변환 테스트벤치',image:null},{title:'물질 최적화 AI',image:null}],
          centers:['에너지IT융합','에너지변환','차세대전지'], mgr_a:'이상엽', mgr_b:'지영민'}
      ]},
    { id:'f_content', name:'콘텐츠', count:36,
      centers:['콘텐츠응용','XR융합플랫폼','정보미디어','홀로그램'],
      mgr_a:'김현식', mgr_b:'최광순',
      techs:[
        { id:'ft_con1', title:'AI 미디어 생성·제작', asis:'인력 중심 미디어 제작, AI 기반 VFX·디지털 휴먼 화면 편집', tobe:'AI 스토리텔링 기반 가상 프로덕션, 콘텐츠 서사구조 생성',
          caps:[{title:'미디어 지능화 자동 편집',image:null},{title:'영상 객체 미디어 처리',image:null},{title:'실시간 렌더링 기술',image:null}],
          centers:['콘텐츠응용','XR융합플랫폼'], mgr_a:'김현식', mgr_b:'최광순'},
        { id:'ft_con2', title:'AI 콘텐츠 분석·저작권 보호', asis:'장르별 유사도 기반 분류·식별, 비가시적 워터마킹', tobe:'AI 기반 침해 콘텐츠 자동 탐지, AI 워터마킹 자동 테이크다운',
          caps:[{title:'AI 기반 영상물 분류·식별·표절탐지',image:null},{title:'저작권 모니터링·예측 분석',image:null},{title:'자동 테이크다운',image:null}],
          centers:['콘텐츠응용','XR융합플랫폼'], mgr_a:'김현식', mgr_b:'최광순'}
      ]},
    { id:'f_agri', name:'농업·해양', count:25,
      centers:['IT응용','스마트네트워크','정보미디어','디지털혁신지원','지능융합SW','스마트센서'],
      mgr_a:'정성환', mgr_b:'권기원',
      techs:[
        { id:'ft_agri1', title:'AI 육종·자율재배', asis:'수작업 육종 및 스마트팜 재배, 경험·반복 기반 품종관리', tobe:'AI 육종으로 신품종 개발기간 단축, 디지털트윈 기반 多변수 자율재배',
          caps:[{title:'수직농장 자율재배 기술',image:null},{title:'AI 육종 영상분석 기술',image:null},{title:'AI 생육 분석기술',image:null}],
          centers:['IT응용','스마트네트워크'], mgr_a:'정성환', mgr_b:'권기원'},
        { id:'ft_agri2', title:'자율 농작업 기계', asis:'작업자 탑승·원격 제어 농기계, 수동 셋업 기반 제한적 자율주행', tobe:'자율 협업 무인 농작업 기계, 농작업 무인화(≥90%)',
          caps:[{title:'농기계 자율주행 요소기술',image:null},{title:'농산물 수확 로봇',image:null},{title:'육묘 자동화 시스템',image:null}],
          centers:['IT응용','스마트네트워크'], mgr_a:'정성환', mgr_b:'권기원'},
        { id:'ft_agri3', title:'AI 수산·양식', asis:'노동집약적·경험적 노하우에 의한 양식장 운영', tobe:'연중 대량생산 가능한 AI 기반 스마트 육상양식',
          caps:[{title:'디지털 양식 생육 모델',image:null},{title:'아쿠아트윈',image:null},{title:'양식생산·에너지·경영 예측모델',image:null}],
          centers:['IT응용','스마트네트워크'], mgr_a:'정성환', mgr_b:'권기원'}
      ]},
    { id:'f_public', name:'공공', count:65,
      centers:['정보미디어','자율지능시스템','복합지능','자율형IoT','IT응용','콘텐츠응용','홀로그램'],
      mgr_a:'금승우', mgr_b:'이상신',
      techs:[
        { id:'ft_pub1', title:'멀티모달 물리보안', asis:'딥러닝 기반 단일 지능 보안영상 분석', tobe:'멀티모달 생성형 AI 기반 영상보안 관제, 온디바이스 엣지 보안',
          caps:[{title:'멀티모달 보안 상황인지',image:null},{title:'온디바이스 엣지 보안 지능 기술',image:null},{title:'AI 기반 범죄구성요소 분석',image:null}],
          centers:['정보미디어','자율지능시스템'], mgr_a:'금승우', mgr_b:'이상신'},
        { id:'ft_pub2', title:'멀티모달 교통 데이터 분석', asis:'단일 엣지 기반 분석 인프라, 단일 지능 상황 인지', tobe:'3-Tier 기반 멀티 엣지 기술 결합, 복합 지능 운용',
          caps:[{title:'멀티모달 교통 데이터 구축',image:null},{title:'합성 데이터 기반 환경 분석',image:null},{title:'분산 엣지 복합 지능',image:null}],
          centers:['정보미디어','자율지능시스템','IT응용'], mgr_a:'금승우', mgr_b:'이상신'}
      ]},
    { id:'f_home', name:'가전', count:22,
      centers:['AI융합가전','콘텐츠응용','복합지능','SoC플랫폼','지능형반도체디바이스'],
      mgr_a:'최철준', mgr_b:'김현식',
      techs:[
        { id:'ft_home1', title:'AI@home 연동·확장', asis:'스마트홈 기반 자동루틴 실행, 글로벌 매터·삼성·LG 플랫폼 종속', tobe:'AI@home 플랫폼서비스 확장, 재실자-Home 연동 기술',
          caps:[{title:'재실자 맞춤 스마트홈 모델',image:null},{title:'사용자·가전 연동 기술',image:null},{title:'AI@Home 작동 시나리오',image:null}],
          centers:['AI융합가전','콘텐츠응용'], mgr_a:'최철준', mgr_b:'김현식'},
        { id:'ft_home2', title:'지능형 상호작용·경험향상', asis:'사용자 정보 중심의 맞춤형 인터페이스, 플랫폼 종속형', tobe:'언어·표정·제스처 복합 요소 기반 개인 맞춤형 사용자 분석',
          caps:[{title:'VLM 기반 감정분석 모델',image:null},{title:'상황 인지형 인터페이스',image:null},{title:'초개인화 맞춤형 서비스',image:null}],
          centers:['AI융합가전','콘텐츠응용'], mgr_a:'최철준', mgr_b:'김현식'}
      ]},
    { id:'f_uav', name:'무인이동체', count:28,
      centers:['자율형IoT','IT응용','모빌리티플랫폼','지능형반도체디바이스'],
      mgr_a:'안일엽', mgr_b:'정성환',
      techs:[
        { id:'ft_uav1', title:'자율비행·군집', asis:'GPS 정밀 위치기반 경로계획·비행, 중앙통제형 군집 비행', tobe:'AI 기반 상황적응 자율비행, 초정밀 군집비행 제어',
          caps:[{title:'임무 군집경로비행',image:null},{title:'다수드론 편대비행',image:null},{title:'다중로봇 협력주행',image:null}],
          centers:['자율형IoT','IT응용','모빌리티플랫폼'], mgr_a:'안일엽', mgr_b:'정성환'},
        { id:'ft_uav2', title:'통합관제·운용', asis:'GCS 개입을 통한 임무서비스 운용, 다수 이기종 통합 관제', tobe:'GCS 개입없는 임무서비스 협력 운용, AI 자율 의사결정',
          caps:[{title:'통합관제시스템',image:null},{title:'통합관제 SW',image:null},{title:'임무서비스 운용',image:null}],
          centers:['자율형IoT','IT응용'], mgr_a:'안일엽', mgr_b:'정성환'},
        { id:'ft_uav3', title:'집단지능 협업', asis:'사전할당 임무계획 분할·협력구성, 통신인프라 지원 협업', tobe:'분산의사결정 기반 자율협업, 무인이동체 간 자율협력',
          caps:[{title:'이기종 무인이동체 간 데이터 공유',image:null},{title:'자율협력 통신구성',image:null},{title:'Edge AI 기반 자율 데이터 분석',image:null}],
          centers:['자율형IoT','IT응용'], mgr_a:'안일엽', mgr_b:'정성환'}
      ]},
    { id:'f_bio', name:'바이오·헬스', count:30,
      centers:['메디컬IT융합','지능융합SW','스마트센서','ICT나노융합'],
      mgr_a:'조영창', mgr_b:'강정훈',
      techs:[
        { id:'ft_bio1', title:'온디바이스 AI 질병 분석·진단', asis:'서버기반 질병 분석·진단, 개인 의료데이터 보안 문제', tobe:'온디바이스 AI 탑재형 질병 진단 의료기기',
          caps:[{title:'서버기반 건강 분석 플랫폼',image:null},{title:'온디바이스 AI 모듈',image:null},{title:'온디바이스 AI 기반 진단',image:null}],
          centers:['메디컬IT융합','지능융합SW'], mgr_a:'조영창', mgr_b:'강정훈'},
        { id:'ft_bio2', title:'AI 기반 디지털 치료', asis:'범용 신경자극 치료기기 및 전자약, 범용 치료기기', tobe:'개인 맞춤형 AI 전자약, 디지털 표현형 기반 맞춤형 DTx',
          caps:[{title:'신경자극기반 디지털 치료',image:null},{title:'AI 전자약·디지털 치료제',image:null},{title:'AI 기반 맞춤형 디지털 치료',image:null}],
          centers:['메디컬IT융합','지능융합SW'], mgr_a:'조영창', mgr_b:'강정훈'}
      ]},
    { id:'f_city', name:'스마트시티', count:19,
      centers:['자율형IoT','IT융합시스템','IT응용'],
      mgr_a:'안일엽', mgr_b:'이승주',
      techs:[
        { id:'ft_city1', title:'AIoT 플랫폼', asis:'자원 및 장치중심 자원 관리, 10만 개 장치 동시관리', tobe:'서비스 맞춤 능동적 자율관리, 다중 도메인 자율적 운용',
          caps:[{title:'AIoT 통합관리 플랫폼',image:null},{title:'도시규모 데이터 통합관리',image:null},{title:'실시간 자율 자원 최적화',image:null}],
          centers:['자율형IoT','IT융합시스템'], mgr_a:'안일엽', mgr_b:'이승주'},
        { id:'ft_city2', title:'스마트시티 데이터허브', asis:'데이터관리 및 통계분석 지원, 일 수십억 건 배치 처리', tobe:'AI 기반 도시 데이터의 융복합 자동화, 비전문가 AI 분석',
          caps:[{title:'데이터허브 기술',image:null},{title:'레퍼런스 역학조사 시스템',image:null},{title:'LLM 기반 AI 데이터 분석',image:null}],
          centers:['자율형IoT','IT융합시스템'], mgr_a:'안일엽', mgr_b:'이승주'},
        { id:'ft_city3', title:'스마트시티 엣지 데이터허브', asis:'도시 로컬 환경의 장치 데이터 수집·관리 및 클라우드 연계', tobe:'Edge+Cloud 연계 자율 데이터 처리·로컬 AI 추론',
          caps:[{title:'스마트시티 엣지 데이터허브',image:null},{title:'엣지-클라우드 연동 플랫폼',image:null},{title:'로컬 AI 추론',image:null}],
          centers:['자율형IoT','IT융합시스템'], mgr_a:'안일엽', mgr_b:'이승주'}
      ]}
  ]
};

// ─── 상태 ────────────────────────────────────────────────
let MAP_DATA = JSON.parse(JSON.stringify(DEFAULT_MAP_DATA));
let isAdmin = false;
let currentUser = null;   // { id, name, role } — null이면 비로그인(방문자)
let authToken = null;     // JWT 토큰
let pendingCardIds = [];  // 승인 대기 중인 카드 ID 목록 [{target_type, target_id}]
let editingId = null;
let editingSection = null;

// ─── API 기반 데이터 로드/저장 ────────────────────────────
// 서버 실행 여부 감지: window._USE_API = true 이면 API 사용, 아니면 localStorage fallback
const USE_API  = (typeof window._USE_API  !== 'undefined') ? window._USE_API  : false;
// 배포된 백엔드 URL. 로컬: '' (상대경로), Railway 배포 시: 'https://xxx.railway.app'
const API_BASE = (typeof window._API_BASE !== 'undefined') ? window._API_BASE : '';

// GitHub raw 콘텐츠 베이스 URL (Image/ 폴더 이미지 서빙용)
const GITHUB_RAW = 'https://raw.githubusercontent.com/hyunhee-oh/-KETI-7-/main';

// 이미지 경로를 절대 URL로 변환
// - Cloudinary URL (https://res.cloudinary.com/...) → 그대로
// - /Image/... 또는 Image/... → GitHub raw 콘텐츠 URL
// - data: → 그대로 (로컬 미리보기)
function resolveImgUrl(path) {
  if (!path) return null;
  if (path.startsWith('data:')) return path;
  if (path.startsWith('http')) return path;  // Cloudinary 등 절대 URL
  // /Image/... → GitHub raw URL
  if (path.startsWith('/Image/')) return GITHUB_RAW + path;
  if (path.startsWith('Image/'))  return GITHUB_RAW + '/' + path;
  if (path.startsWith('../Image/')) return GITHUB_RAW + '/' + path.slice(3);
  // 그 외 /로 시작하는 경로는 API_BASE 사용
  if (path.startsWith('/') && API_BASE) return API_BASE + path;
  return path;
}

// ─── 인증 헤더 생성 헬퍼 ────────────────────────────────
function authHeaders(extra) {
  const h = { ...(extra || {}) };
  if (authToken) h['Authorization'] = 'Bearer ' + authToken;
  return h;
}
function authJsonHeaders() {
  return authHeaders({ 'Content-Type': 'application/json' });
}

// ─── 로그인/로그아웃 ────────────────────────────────────
async function openLoginModal() {
  const modal = document.getElementById('loginModal');
  const sel   = document.getElementById('loginNameSelect');
  document.getElementById('loginError').classList.remove('show');
  document.getElementById('loginPassword').value = '';

  try {
    const res  = await fetch(API_BASE + '/api/auth/managers');
    const list = await res.json();
    sel.innerHTML = '<option value="">이름을 선택하세요</option>';
    list.forEach(u => {
      const opt = document.createElement('option');
      opt.value = u.name;
      opt.textContent = u.name + (u.role === 'admin' ? ' (Admin)' : '');
      sel.appendChild(opt);
    });
  } catch {
    sel.innerHTML = '<option value="">목록 로드 실패</option>';
  }
  modal.classList.add('show');
}
function closeLoginModal() {
  document.getElementById('loginModal').classList.remove('show');
}

async function doLogin() {
  const name     = document.getElementById('loginNameSelect').value;
  const password = document.getElementById('loginPassword').value;
  const errEl    = document.getElementById('loginError');

  if (!name || !password) {
    errEl.textContent = '이름과 비밀번호를 모두 입력해주세요.';
    errEl.classList.add('show');
    return;
  }
  try {
    const res = await fetch(API_BASE + '/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password })
    });
    const data = await res.json();
    if (!res.ok) {
      errEl.textContent = data.error || '로그인 실패';
      errEl.classList.add('show');
      return;
    }
    authToken   = data.token;
    currentUser = data.user;
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    closeLoginModal();
    applyLoginState();
  } catch (e) {
    errEl.textContent = '서버 연결 실패: ' + e.message;
    errEl.classList.add('show');
  }
}

function logout() {
  authToken   = null;
  currentUser = null;
  isAdmin     = false;
  pendingCardIds = [];
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentUser');
  hideAdminPages();
  applyLoginState();
  // AI 탭의 첫 번째 탭(개요)으로 복귀
  const firstTab = document.querySelector('.tab-btn');
  if (firstTab) switchTab(firstTab, 't-overview');
  const ov = document.getElementById('t-overview');
  if (ov) { ov.style.display = 'flex'; }
}

function applyLoginState() {
  const avatar  = document.getElementById('userAvatar');
  const display = document.getElementById('userDisplayName');
  const btn     = document.getElementById('adminBtn');
  const text    = document.getElementById('adminBtnText');
  const banner  = document.getElementById('adminBanner');

  if (currentUser) {
    avatar.textContent  = currentUser.name.charAt(0);
    display.textContent = currentUser.name;
    isAdmin = true;
    btn.classList.add('is-admin');
    text.textContent = '로그아웃';
    banner.classList.add('show');
    document.querySelectorAll('.admin-only').forEach(el => el.style.display = '');
    document.body.classList.add('admin-mode');
    // Admin만 권한 설정 메뉴 표시
    const permMenu = document.getElementById('permMenuItem');
    if (permMenu) permMenu.style.display = (currentUser.role === 'admin') ? '' : 'none';
    loadPendingCards();
  } else {
    avatar.textContent  = '?';
    display.textContent = '방문자';
    isAdmin = false;
    btn.classList.remove('is-admin');
    text.textContent = '관리자 모드';
    banner.classList.remove('show');
    document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'none');
    document.body.classList.remove('admin-mode');
  }
  renderMap();
  renderAllTrendTabs();
}

async function loadPendingCards() {
  if (!USE_API) return;
  try {
    const res  = await fetch(API_BASE + '/api/approvals/pending-cards');
    pendingCardIds = await res.json();
  } catch { pendingCardIds = []; }
}

function isCardPending(type, id) {
  return pendingCardIds.some(p => p.target_type === type && p.target_id === id);
}

// 카드 편집 가능 여부 판정
function canEditCard(itemOrTech, parentItem) {
  if (!currentUser) return false;
  if (currentUser.role === 'admin') return true;
  // Manager: 담당자 기준
  const n = currentUser.name;
  if (itemOrTech.mgr_a === n || itemOrTech.mgr_b === n) return true;
  if (parentItem && (parentItem.mgr_a === n || parentItem.mgr_b === n)) return true;
  return false;
}

async function loadFromStorage() {
  if (USE_API) {
    try {
      const res = await fetch(API_BASE + '/api/map');
      if (!res.ok) throw new Error('서버 응답 오류: ' + res.status);
      MAP_DATA = await res.json();
    } catch(e) {
      console.warn('API 로드 실패, localStorage fallback:', e.message);
      _loadFromLocalStorage();
    }
  } else {
    _loadFromLocalStorage();
  }
}

function _loadFromLocalStorage() {
  try {
    const saved = localStorage.getItem('keti_map_data_v3');
    if (saved) MAP_DATA = JSON.parse(saved);
  } catch(e) { console.warn('localStorage load failed', e); }
}

function saveToStorage() {
  if (!USE_API) {
    try { localStorage.setItem('keti_map_data_v3', JSON.stringify(MAP_DATA)); }
    catch(e) { console.warn('localStorage save failed', e); }
  }
  // API 모드에서는 각 CRUD 함수가 직접 API 호출
}

// ─── API 호출 헬퍼 ────────────────────────────────────────
async function apiSaveMapItem(item, section, isNew) {
  if (!USE_API) return;
  try {
    const body = { ...item, section };
    const method = isNew ? 'POST' : 'PUT';
    const url = isNew ? API_BASE + '/api/map/items' : API_BASE + `/api/map/items/${item.id}`;
    const res = await fetch(url, { method, headers: authJsonHeaders(), body: JSON.stringify(body) });
    const data = await res.json().catch(() => ({}));
    if (data.pending) {
      alert('변경 요청이 제출되었습니다. Admin 승인 후 반영됩니다.');
      loadPendingCards();
      return 'pending';
    }
  } catch(e) { console.warn('apiSaveMapItem 실패:', e); }
}

async function apiDeleteMapItem(id) {
  if (!USE_API) return;
  try {
    const res = await fetch(API_BASE + `/api/map/items/${id}`, { method: 'DELETE', headers: authHeaders() });
    const data = await res.json().catch(() => ({}));
    if (data.pending) {
      alert('삭제 요청이 제출되었습니다. Admin 승인 후 반영됩니다.');
      loadPendingCards();
      return 'pending';
    }
  } catch(e) { console.warn('apiDeleteMapItem 실패:', e); }
}

async function apiSaveTech(tech, itemId, isNew) {
  if (!USE_API) return true;
  try {
    const body = { ...tech, item_id: itemId };
    const method = isNew ? 'POST' : 'PUT';
    const url = isNew ? API_BASE + '/api/techs' : API_BASE + `/api/techs/${tech.id}`;
    const res = await fetch(url, { method, headers: authJsonHeaders(), body: JSON.stringify(body) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok && !data.pending) {
      console.error('apiSaveTech 서버 오류:', res.status, data);
      return false;
    }
    if (data.pending) {
      alert('변경 요청이 제출되었습니다. Admin 승인 후 반영됩니다.');
      loadPendingCards();
      return 'pending';
    }
    return true;
  } catch(e) {
    console.error('apiSaveTech 네트워크 오류:', e);
    return false;
  }
}

async function apiDeleteTech(id) {
  if (!USE_API) return;
  try {
    const res = await fetch(API_BASE + `/api/techs/${id}`, { method: 'DELETE', headers: authHeaders() });
    const data = await res.json().catch(() => ({}));
    if (data.pending) {
      alert('삭제 요청이 제출되었습니다. Admin 승인 후 반영됩니다.');
      loadPendingCards();
      return 'pending';
    }
  } catch(e) { console.warn('apiDeleteTech 실패:', e); }
}

/**
 * 이미지 업로드: base64 DataURL → 서버 파일 저장
 * section: 'core' | 'base' | 'fusion_left' | 'fusion_right'
 * 반환값: 서버에 저장된 image 경로 (../Image/AI/.../파일명.png)
 */
async function apiUploadCapImage(dataUrl, title, techId, section) {
  if (!USE_API || !dataUrl || !dataUrl.startsWith('data:')) return dataUrl;
  try {
    // base64를 Blob으로 변환
    const arr  = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    const u8arr = new Uint8Array(bstr.length);
    for (let i = 0; i < bstr.length; i++) u8arr[i] = bstr.charCodeAt(i);
    const blob = new Blob([u8arr], { type: mime });
    const ext  = mime.split('/')[1] || 'png';

    const fd = new FormData();
    fd.append('file', blob, title + '.' + ext);
    fd.append('tech_id', techId);
    fd.append('title', title);
    fd.append('category', section);

    const res  = await fetch(API_BASE + '/api/caps/upload', { method: 'POST', body: fd });
    const data = await res.json();
    // 서버가 반환한 url로 교체
    return data.image_url || dataUrl;
  } catch(e) {
    console.warn('이미지 업로드 실패:', e);
    return dataUrl;
  }
}

// ─── 유틸리티 ────────────────────────────────────────────
function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function uid() { return 'id_' + Date.now() + '_' + Math.random().toString(36).slice(2,7); }

function allSections() { return ['core','base','fusion_left','fusion_right']; }
function sectionType(sec) {
  if (sec === 'core') return 'core';
  if (sec === 'base') return 'base';
  return 'fusion';
}
function findItem(id) {
  for (const sec of allSections()) {
    const item = MAP_DATA[sec].find(i => i.id === id);
    if (item) return { item, section: sec };
  }
  return null;
}
function findTech(techId) {
  for (const sec of allSections()) {
    for (const item of MAP_DATA[sec]) {
      const tech = item.techs.find(t => t.id === techId);
      if (tech) return { tech, item, section: sec };
    }
  }
  return null;
}
function getTechTitles(item) {
  return item.techs.map(t => t.title);
}

// ─── 역량맵 렌더링 (탭1) ────────────────────────────────
function buildMapCard(item, type) {
  const showEdit = isAdmin && canEditCard(item, null);
  const pending  = isCardPending('map_item', item.id);
  // 관리자 모드: 녹색 수정 중 / 조회자 모드: 변화 없음
  const pendingClass = pending ? (isAdmin ? ' mc-editing' : '') : '';
  const editBtn = showEdit
    ? `<button class="mc-edit-btn" onclick="openEditModal('${item.id}')">편집</button>` : '';
  const techsHtml = item.techs.map(t => `<span class="mc-tag">${esc(t.title)}</span>`).join('');
  const centersHtml = item.centers.map(c => `<span class="mc-center-chip">${esc(c)}</span>`).join('');
  const pendingBadge = (pending && isAdmin) ? '<span class="editing-badge">수정 중</span>' : '';
  return `<div class="mc mc-${type}${pendingClass}" data-id="${item.id}">
  <div class="mc-body">
    <div class="mc-head">
      <div class="mc-head-row">${pendingBadge}
        <span class="mc-name">${esc(item.name)}</span>
        <span class="mc-cnt">${item.count}명</span>
      </div>
      <div class="mc-mgr-row">
        <span class="mc-mgr-chip lead"><span class="mc-role-badge chief">정</span>${esc(item.mgr_a)}</span>
        <span class="mc-mgr-chip"><span class="mc-role-badge deputy">부</span>${esc(item.mgr_b)}</span>
      </div>
    </div>
    <div class="mc-section">
      <span class="mc-lbl">유망기술</span>
      <div class="mc-tags">${techsHtml}</div>
    </div>
    <div class="mc-section" style="margin-bottom:0">
      <span class="mc-lbl">연구센터</span>
      <div class="mc-centers">${centersHtml}</div>
    </div>
  </div>
  ${editBtn}
</div>`;
}

function renderMap() {
  const container = document.getElementById('techMap');
  if (!container) return;
  const isManagerMode = currentUser && currentUser.role === 'manager' && isAdmin;
  const filterItems = (arr) => isManagerMode ? arr.filter(i => canEditCard(i, null)) : arr;
  const coreCards = filterItems(MAP_DATA.core).map(i => buildMapCard(i,'core')).join('');
  const baseCards = filterItems(MAP_DATA.base).map(i => buildMapCard(i,'base')).join('');
  const fusionCards = filterItems([...MAP_DATA.fusion_left,...MAP_DATA.fusion_right]).map(i => buildMapCard(i,'fusion')).join('');
  const addCore = isAdmin ? `<button class="map-add-btn" onclick="openAddModal('core')">+ 핵심기술 추가</button>` : '';
  const addBase = isAdmin ? `<button class="map-add-btn" onclick="openAddModal('base')">+ 기반기술 추가</button>` : '';
  const addFusion = isAdmin ? `<button class="map-add-btn" style="grid-column:1/-1" onclick="openAddModal('fusion_right')">+ 융합기술 추가</button>` : '';
  container.innerHTML = `
<div class="map-panel mp-core">
  <span class="map-panel-label core">AI 핵심기술<span class="mpl-sub">총괄: 임태범</span></span>
  <div class="map-single-grid">${coreCards}${addCore}</div>
</div>
<div class="map-panel mp-base">
  <span class="map-panel-label base">AI 기반기술<span class="mpl-sub">총괄: 황태호(반도체) · 고재진(시스템)</span></span>
  <div class="map-single-grid">${baseCards}${addBase}</div>
</div>
<div class="map-panel mp-fusion">
  <span class="map-panel-label fusion">AI 융합기술 (AI 응용)</span>
  <div class="map-fusion-grid">${fusionCards}${addFusion}</div>
</div>`;
}

// ─── 트렌드 카드 렌더링 (탭2~4) ─────────────────────────
function buildTrendCard(tech, parentItem, type) {
  const showEdit = isAdmin && canEditCard(tech, parentItem);
  const pending  = isCardPending('tech', tech.id);
  const pendingClass = pending ? (isAdmin ? ' tc-editing' : '') : '';
  const cls = 'tc-' + type;
  const hasImages = tech.caps.some(c => c.image);
  let capsHtml;
  if (hasImages) {
    const items = tech.caps.map(c => {
      if (c.image) {
        return `<div class="tc-img-item"><img src="${esc(resolveImgUrl(c.image))}" alt="${esc(c.title)}"><span class="tc-img-label">${esc(c.title)}</span></div>`;
      }
      return `<div class="tc-img-item" style="background:#F8F9FB;display:flex;align-items:center;justify-content:center;aspect-ratio:4/3"><span style="color:var(--text-4);font-size:14px">${esc(c.title)}</span></div>`;
    }).join('');
    capsHtml = `<div class="tc-img-grid">${items}</div>`;
  } else {
    capsHtml = `<div class="tc-cap-chips">${tech.caps.map(c => `<span class="tc-cap-chip">${esc(c.title)}</span>`).join('')}</div>`;
  }
  const centersHtml = tech.centers.map(c => `<span class="center-c">${esc(c)}</span>`).join('');
  const mgrA = tech.mgr_a || parentItem.mgr_a;
  const mgrB = tech.mgr_b || parentItem.mgr_b;
  const pendingBadge = (pending && isAdmin) ? '<span class="editing-badge">수정 중</span>' : '';
  return `<div class="trend-card ${cls}${pendingClass}" data-cat="${esc(parentItem.name)}" data-tech-id="${tech.id}">
  <div class="trend-card-head">
    <div class="trend-head-left">
      <div class="trend-card-title">${esc(tech.title)} ${pendingBadge}</div>
      <div class="person-row">
        <span class="person-chip"><span class="role-dot chief">정</span>${esc(mgrA)}</span>
        <span class="person-chip"><span class="role-dot deputy">부</span>${esc(mgrB)}</span>
      </div>
    </div>
    <span class="cat-chip">${esc(parentItem.name)}</span>
  </div>
  <div class="trend-card-body">
    <div class="flow-row">
      <div class="flow-block asis"><div class="flow-tag asis-tag">AS-IS</div><div class="flow-text">${esc(tech.asis)}${tech.asis_sub ? `<div class="flow-sub">${esc(tech.asis_sub)}</div>` : ''}</div></div>
      <div class="flow-arrow-col"><div class="flow-arrow-icon">&#8594;</div></div>
      <div class="flow-block tobe"><div class="flow-tag tobe-tag">TO-BE</div><div class="flow-text">${esc(tech.tobe)}${tech.tobe_sub ? `<div class="flow-sub">${esc(tech.tobe_sub)}</div>` : ''}</div></div>
    </div>
    <div class="tc-cap-section">
      <div class="tc-cap-label">KETI 보유역량</div>
      <div class="tc-viewer-area">${capsHtml}</div>
    </div>
  </div>
  <div class="trend-card-foot">
    <div class="center-col"><div class="center-label">연구센터</div><div class="center-chips">${centersHtml}</div></div>
  </div>
  ${showEdit ? `<button class="tc-edit-btn" onclick="openTrendEditModal('${tech.id}')">편집</button>` : ''}
</div>`;
}

function renderTrendTab(tabId, sections) {
  const container = document.getElementById(tabId);
  if (!container) return;
  const allItems = [];
  sections.forEach(sec => {
    MAP_DATA[sec].forEach(item => {
      const type = sectionType(sec);
      item.techs.forEach(tech => {
        allItems.push({ tech, item, type });
      });
    });
  });
  // Manager는 자신이 권한 가진 카드만 표시
  const items = (currentUser && currentUser.role === 'manager' && isAdmin)
    ? allItems.filter(i => canEditCard(i.tech, i.item))
    : allItems;
  const categories = [...new Set(items.map(i => i.item.name))];
  const searchSvg = '<svg width="13" height="13" viewBox="0 0 16 16" fill="none"><circle cx="6.5" cy="6.5" r="5" stroke="#9CA3AF" stroke-width="1.5"/><path d="M10.5 10.5L14 14" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round"/></svg>';
  const pdfSvg = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1v9m0 0L5 7m3 3l3-3M2 12v1.5A1.5 1.5 0 003.5 15h9a1.5 1.5 0 001.5-1.5V12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const sectionStr = JSON.stringify(sections);
  const titleMap = {'t-core':'AI 핵심기술 트렌드 및 KETI 보유 역량','t-base':'AI 기반기술 트렌드 및 KETI 보유 역량','t-fusion':'AI 융합기술 트렌드 및 KETI 보유 역량'};
  const pdfTitle = titleMap[tabId] || '';
  const filterHtml = `<div class="filter-bar" data-tab="${tabId}">
    <span class="filter-label">카테고리</span>
    <span class="filter-chip active" onclick="filterChip(this)">전체</span>
    ${categories.map(c => `<span class="filter-chip" onclick="filterChip(this)">${esc(c)}</span>`).join('')}
    <div class="filter-search">
      <span class="filter-search-icon">${searchSvg}</span>
      <input type="text" placeholder="기술명, 연구센터 검색..." oninput="applyTrendFilter(this.closest('.filter-bar'))">
    </div>
    <button class="btn-s btn-pdf" onclick="downloadTrendPdf('${tabId}',${esc(sectionStr)},'${esc(pdfTitle)}')" title="PDF 다운로드">${pdfSvg} PDF</button>
  </div>`;
  const gridId = tabId + 'Grid';
  const cardsHtml = items.map(i => buildTrendCard(i.tech, i.item, i.type)).join('');
  container.innerHTML = filterHtml + `<div class="trend-grid" id="${gridId}">${cardsHtml}</div>`;
}

function renderAllTrendTabs() {
  renderTrendTab('t-core', ['core']);
  renderTrendTab('t-base', ['base']);
  renderTrendTab('t-fusion', ['fusion_left','fusion_right']);
  updateTabCounts();
}

function updateTabCounts() {
  const counts = {
    core: MAP_DATA.core.reduce((s,i) => s + i.techs.length, 0),
    base: MAP_DATA.base.reduce((s,i) => s + i.techs.length, 0),
    fusion: [...MAP_DATA.fusion_left,...MAP_DATA.fusion_right].reduce((s,i) => s + i.techs.length, 0)
  };
  const btns = document.querySelectorAll('.tab-btn');
  const labels = [null,
    'AI 핵심기술 트렌드 및 KETI 보유 역량',
    'AI 기반기술 트렌드 및 KETI 보유 역량',
    'AI 융합기술 트렌드 및 KETI 보유 역량'
  ];
  const vals = [null, counts.core, counts.base, counts.fusion];
  for (let i = 1; i <= 3; i++) {
    if (btns[i]) btns[i].innerHTML = labels[i] + ` <span class="tab-count">${vals[i]}</span>`;
  }
}

// ─── 필터 ────────────────────────────────────────────────
function filterChip(el) {
  const bar = el.closest('.filter-bar');
  bar.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  applyTrendFilter(bar);
}
function applyTrendFilter(bar) {
  const activeCat = bar.querySelector('.filter-chip.active');
  const cat = activeCat ? activeCat.textContent.trim() : '전체';
  const searchInput = bar.querySelector('.filter-search input');
  const q = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const grid = bar.nextElementSibling;
  if (!grid) return;
  grid.querySelectorAll('.trend-card').forEach(card => {
    const cardCat = card.dataset.cat || '';
    const catMatch = (cat === '전체' || cardCat === cat);
    const textMatch = !q || card.textContent.toLowerCase().includes(q);
    card.style.display = (catMatch && textMatch) ? '' : 'none';
  });
}

// ─── 역량맵 검색 ─────────────────────────────────────────
function filterMapCards(q) {
  q = (q || '').toLowerCase().trim();
  document.querySelectorAll('#techMap .mc').forEach(card => {
    card.style.display = (!q || card.textContent.toLowerCase().includes(q)) ? '' : 'none';
  });
  document.querySelectorAll('#techMap .map-panel').forEach(panel => {
    const visible = panel.querySelectorAll('.mc:not([style*="display: none"])');
    panel.style.opacity = (q && visible.length === 0) ? '0.3' : '';
  });
}

// ─── 태그 입력 헬퍼 ──────────────────────────────────────
function initTagInput(containerId, initialTags) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  container.dataset.tags = JSON.stringify(initialTags || []);
  (initialTags || []).forEach(tag => addTagChip(container, tag));
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = '키워드 입력 후 Enter';
  input.className = 'tag-input-field';
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && this.value.trim()) {
      e.preventDefault();
      const val = this.value.trim();
      const tags = JSON.parse(container.dataset.tags);
      if (!tags.includes(val)) {
        tags.push(val);
        container.dataset.tags = JSON.stringify(tags);
        addTagChip(container, val, input);
      }
      this.value = '';
    }
  });
  container.appendChild(input);
}
function addTagChip(container, text, beforeEl) {
  const chip = document.createElement('span');
  chip.className = 'tag-chip';
  chip.innerHTML = esc(text) + '<button class="tag-remove" onclick="removeTag(this)">×</button>';
  chip.dataset.value = text;
  if (beforeEl) container.insertBefore(chip, beforeEl);
  else container.appendChild(chip);
}
function removeTag(btn) {
  const chip = btn.parentElement;
  const container = chip.parentElement;
  const val = chip.dataset.value;
  const tags = JSON.parse(container.dataset.tags);
  container.dataset.tags = JSON.stringify(tags.filter(t => t !== val));
  chip.remove();
}
function getTagValues(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return [];
  return JSON.parse(container.dataset.tags || '[]');
}

// ─── 드롭다운 센터 선택 헬퍼 ────────────────────────────
function initCenterDropdown(containerId, selectedCenters) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  container.dataset.selected = JSON.stringify(selectedCenters || []);
  const chipsWrap = document.createElement('div');
  chipsWrap.className = 'center-selected-chips';
  container.appendChild(chipsWrap);
  (selectedCenters || []).forEach(c => addCenterChip(chipsWrap, c));

  const searchWrap = document.createElement('div');
  searchWrap.className = 'center-search-wrap';
  searchWrap.innerHTML = `
    <input type="text" class="center-search-input" placeholder="연구센터 검색..." onfocus="openCenterList(this)" oninput="filterCenterList(this)">
    <div class="center-list" style="display:none"></div>`;
  container.appendChild(searchWrap);
  buildCenterList(searchWrap.querySelector('.center-list'), container);

  document.addEventListener('click', function handler(e) {
    if (!container.contains(e.target)) {
      const list = container.querySelector('.center-list');
      if (list) list.style.display = 'none';
    }
  });
}
function buildCenterList(listEl, container) {
  const selected = JSON.parse(container.dataset.selected || '[]');
  listEl.innerHTML = CENTER_POOL.map(c => {
    const checked = selected.includes(c);
    return `<div class="center-list-item${checked ? ' disabled' : ''}" data-name="${esc(c)}" onclick="selectCenterItem(this)">${esc(c)}</div>`;
  }).join('');
}
function openCenterList(input) {
  const wrap = input.closest('.center-search-wrap');
  const list = wrap.querySelector('.center-list');
  const container = input.closest('.center-picker');
  buildCenterList(list, container);
  list.style.display = 'block';
  filterCenterList(input);
}
function filterCenterList(input) {
  const keyword = input.value.trim().toLowerCase();
  const list = input.closest('.center-search-wrap').querySelector('.center-list');
  list.querySelectorAll('.center-list-item').forEach(item => {
    const name = item.dataset.name.toLowerCase();
    item.style.display = name.includes(keyword) ? '' : 'none';
  });
}
function selectCenterItem(item) {
  if (item.classList.contains('disabled')) return;
  const name = item.dataset.name;
  const container = item.closest('.center-picker');
  const selected = JSON.parse(container.dataset.selected || '[]');
  if (selected.includes(name)) return;
  selected.push(name);
  container.dataset.selected = JSON.stringify(selected);
  addCenterChip(container.querySelector('.center-selected-chips'), name);
  item.classList.add('disabled');
  const input = container.querySelector('.center-search-input');
  if (input) { input.value = ''; filterCenterList(input); }
}
function addCenterChip(wrap, name) {
  const chip = document.createElement('span');
  chip.className = 'tag-chip center-tag';
  chip.innerHTML = esc(name) + '<button class="tag-remove" onclick="removeCenterTag(this)">x</button>';
  chip.dataset.value = name;
  wrap.appendChild(chip);
}
function removeCenterTag(btn) {
  const chip = btn.parentElement;
  const container = chip.closest('.center-picker');
  const val = chip.dataset.value;
  const selected = JSON.parse(container.dataset.selected);
  container.dataset.selected = JSON.stringify(selected.filter(c => c !== val));
  chip.remove();
  const list = container.querySelector('.center-list');
  if (list) buildCenterList(list, container);
}
function getCenterValues(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return [];
  return JSON.parse(container.dataset.selected || '[]');
}

// ─── 역량맵 편집 모달 ───────────────────────────────────
function openEditModal(id) {
  const found = findItem(id);
  if (!found) return;
  const { item, section } = found;
  editingId = id;
  editingSection = section;
  document.getElementById('modalTitle').textContent = '편집: ' + item.name;
  document.getElementById('editName').value = item.name;
  document.getElementById('editCount').value = item.count;
  document.getElementById('editMgrA').value = item.mgr_a;
  document.getElementById('editMgrB').value = item.mgr_b;
  document.getElementById('deleteBtn').style.display = '';
  document.getElementById('sectionPickerRow').style.display = 'none';
  initTagInput('editTechTags', getTechTitles(item));
  initCenterDropdown('editCenterPicker', [...item.centers]);
  document.getElementById('editModal').classList.add('show');
}

function openAddModal(section) {
  editingId = null;
  editingSection = section || null;
  document.getElementById('modalTitle').textContent = '새 기술 추가';
  document.getElementById('editName').value = '';
  document.getElementById('editCount').value = '';
  document.getElementById('editMgrA').value = '';
  document.getElementById('editMgrB').value = '';
  document.getElementById('deleteBtn').style.display = 'none';
  document.getElementById('sectionPickerRow').style.display = section ? 'none' : '';
  if (section) document.getElementById('editSectionPick').value = section;
  initTagInput('editTechTags', []);
  initCenterDropdown('editCenterPicker', []);
  document.getElementById('editModal').classList.add('show');
}

function closeEditModal() {
  document.getElementById('editModal').classList.remove('show');
  editingId = null;
  editingSection = null;
}

async function saveEditModal() {
  const name = document.getElementById('editName').value.trim();
  const count = parseInt(document.getElementById('editCount').value) || 0;
  const mgr_a = document.getElementById('editMgrA').value.trim();
  const mgr_b = document.getElementById('editMgrB').value.trim();
  const techTitles = getTagValues('editTechTags');
  const centers = getCenterValues('editCenterPicker');
  if (!name) { alert('기술명을 입력하세요.'); return; }

  if (editingId) {
    const found = findItem(editingId);
    if (found) {
      const item = found.item;
      item.name = name;
      item.count = count;
      item.mgr_a = mgr_a;
      item.mgr_b = mgr_b;
      item.centers = centers;
      syncTechs(item, techTitles);
      const result = await apiSaveMapItem(item, found.section, false);
      if (result === 'pending') {
        await loadFromStorage();
        loadPendingCards();
        renderMap();
        renderAllTrendTabs();
        closeEditModal();
        return;
      }
    }
  } else {
    const targetSection = editingSection || document.getElementById('editSectionPick').value || 'core';
    const newItem = {
      id: uid(), name, count, centers, mgr_a, mgr_b,
      techs: techTitles.map(t => ({
        id: uid(), title: t, asis:'', tobe:'',
        caps:[], centers:[], mgr_a:'', mgr_b:''
      }))
    };
    MAP_DATA[targetSection].push(newItem);
    const result = await apiSaveMapItem(newItem, targetSection, true);
    if (result === 'pending') {
      await loadFromStorage();
      loadPendingCards();
      renderMap();
      renderAllTrendTabs();
      closeEditModal();
      return;
    }
    if (techTitles.length > 0) {
      pendingTechDetails = newItem.techs.slice();
      openTechDetailSubModal(0);
    }
  }
  saveToStorage();
  renderMap();
  renderAllTrendTabs();
  closeEditModal();
}

function syncTechs(item, newTitles) {
  const existingTitles = item.techs.map(t => t.title);
  const removed = item.techs.filter(t => !newTitles.includes(t.title));
  const kept = item.techs.filter(t => newTitles.includes(t.title));
  const added = newTitles.filter(t => !existingTitles.includes(t));
  item.techs = kept;
  added.forEach(title => {
    const newTech = { id: uid(), title, asis:'', asis_sub:'', tobe:'', tobe_sub:'', caps:[], centers:[], mgr_a:'', mgr_b:'' };
    item.techs.push(newTech);
  });
  if (added.length > 0) {
    pendingTechDetails = item.techs.filter(t => added.includes(t.title));
    setTimeout(() => openTechDetailSubModal(0), 300);
  }
}

function deleteMapItem() {
  if (!editingId) { closeEditModal(); return; }
  const label = document.getElementById('editName').value;
  if (!confirm('"' + label + '" 항목을 삭제하시겠습니까?\n포함된 유망기술 카드도 모두 삭제됩니다.')) return;
  const found = findItem(editingId);
  if (found) {
    MAP_DATA[found.section] = MAP_DATA[found.section].filter(i => i.id !== editingId);
    apiDeleteMapItem(editingId);
  }
  saveToStorage();
  renderMap();
  renderAllTrendTabs();
  closeEditModal();
}

// ─── 유망기술 상세 서브모달 ──────────────────────────────
let pendingTechDetails = [];
let currentTechDetailIdx = 0;

function openTechDetailSubModal(idx) {
  if (idx >= pendingTechDetails.length) {
    document.getElementById('techDetailModal').classList.remove('show');
    if (!USE_API) saveToStorage();
    renderMap();
    renderAllTrendTabs();
    return;
  }
  currentTechDetailIdx = idx;
  const tech = pendingTechDetails[idx];
  document.getElementById('tdmTitle').textContent = '유망기술 상세: ' + tech.title + ' (' + (idx+1) + '/' + pendingTechDetails.length + ')';
  document.getElementById('tdmTechTitle').value = tech.title;
  document.getElementById('tdmAsis').value = tech.asis || '';
  document.getElementById('tdmAsisSub').value = tech.asis_sub || '';
  document.getElementById('tdmTobe').value = tech.tobe || '';
  document.getElementById('tdmTobeSub').value = tech.tobe_sub || '';
  document.getElementById('tdmMgrA').value = tech.mgr_a || '';
  document.getElementById('tdmMgrB').value = tech.mgr_b || '';
  initCenterDropdown('tdmCenterPicker', [...(tech.centers || [])]);
  initCapsList(tech.caps || []);
  // API 업로드용 섹션 정보 주입
  document.getElementById('tdmCapsList').dataset.section = editingSection || 'core';
  document.getElementById('techDetailModal').classList.add('show');
}

function initCapsList(caps) {
  const container = document.getElementById('tdmCapsList');
  container.innerHTML = '';
  caps.forEach((c, i) => addCapRow(container, c, i));
  if (caps.length === 0) addCapRow(container, {title:'',image:null}, 0);
}
function addCapRow(container, cap, idx) {
  const row = document.createElement('div');
  row.className = 'cap-edit-row';
  const hasImg = cap.image ? true : false;
  row.innerHTML = `
    <div class="cap-preview${hasImg ? ' has-img' : ''}">${hasImg ? `<img src="${esc(resolveImgUrl(cap.image))}" alt="">` : '<span class="cap-preview-empty">No Image</span>'}</div>
    <input type="text" class="form-input cap-title-input" value="${esc(cap.title || '')}" placeholder="보유역량 제목">
    <label class="cap-img-label">
      <input type="file" accept="image/*" style="display:none" onchange="capFileChange(this)">
      <span class="cap-img-btn">${hasImg ? '변경' : '이미지 선택'}</span>
    </label>
    <button class="cap-remove-btn" onclick="this.parentElement.remove()">×</button>`;
  if (cap.image) row.dataset.image = cap.image;
  container.appendChild(row);
}
function capFileChange(input) {
  const row  = input.closest('.cap-edit-row');
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    // 항상 base64로 즉시 미리보기
    row.dataset.image = dataUrl;
    const preview = row.querySelector('.cap-preview');
    preview.classList.add('has-img');
    preview.innerHTML = `<img src="${dataUrl}" alt="">`;
    row.querySelector('.cap-img-btn').textContent = '변경';

    // API 모드: 서버에 파일 업로드 후 실제 URL로 교체
    if (USE_API) {
      const capsList = input.closest('[data-section]');
      const section  = capsList ? capsList.dataset.section : 'core';
      const title    = row.querySelector('.cap-title-input')
                         ? row.querySelector('.cap-title-input').value.trim()
                         : '';
      // 업로드 중 표시 → 저장 버튼 클릭 시 대기 감지용
      row.dataset.uploading = '1';
      const btn = row.querySelector('.cap-img-btn');
      if (btn) btn.textContent = '업로드 중...';

      _uploadCapFile(file, title || 'image', section).then(url => {
        delete row.dataset.uploading;
        if (btn) btn.textContent = '변경';
        if (url) {
          row.dataset.image = url;
          preview.innerHTML = `<img src="${resolveImgUrl(url)}" alt="">`;
          preview.classList.add('has-img');
        }
      }).catch(() => {
        delete row.dataset.uploading;
        if (btn) btn.textContent = '재시도';
      });
    }
  };
  reader.readAsDataURL(file);
}

async function _uploadCapFile(file, title, section) {
  try {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('title', title);
    fd.append('category', section);
    const res  = await fetch(API_BASE + '/api/image/upload', { method: 'POST', body: fd });
    if (!res.ok) throw new Error('upload ' + res.status);
    const data = await res.json();
    return data.image_url || null;
  } catch(e) {
    console.warn('이미지 서버 업로드 실패 (로컬 미리보기 유지):', e.message);
    return null;
  }
}
function addCapRowBtn() {
  const container = document.getElementById('tdmCapsList');
  addCapRow(container, {title:'',image:null}, container.children.length);
}
function getCapValues() {
  const rows = document.querySelectorAll('#tdmCapsList .cap-edit-row');
  const caps = [];
  rows.forEach(row => {
    const title = row.querySelector('.cap-title-input').value.trim();
    if (title) {
      caps.push({ title, image: row.dataset.image || null });
    }
  });
  return caps;
}

async function saveTechDetail() {
  // 업로드 중인 이미지가 있으면 완료 대기
  const uploadingRows = document.querySelectorAll('#tdmCapsList .cap-edit-row[data-uploading="1"]');
  if (uploadingRows.length > 0) {
    alert('이미지 업로드 중입니다. 잠시 후 다시 저장해주세요. (버튼이 "변경"으로 바뀌면 완료)');
    return;
  }

  const tech = pendingTechDetails[currentTechDetailIdx];
  tech.title = document.getElementById('tdmTechTitle').value.trim() || tech.title;
  tech.asis = document.getElementById('tdmAsis').value.trim();
  tech.asis_sub = document.getElementById('tdmAsisSub').value.trim();
  tech.tobe = document.getElementById('tdmTobe').value.trim();
  tech.tobe_sub = document.getElementById('tdmTobeSub').value.trim();
  tech.mgr_a = document.getElementById('tdmMgrA').value.trim();
  tech.mgr_b = document.getElementById('tdmMgrB').value.trim();
  tech.centers = getCenterValues('tdmCenterPicker');
  tech.caps = getCapValues();
  if (USE_API) {
    const foundItem = findTech(tech.id);
    const itemId = foundItem ? foundItem.item.id : null;
    if (itemId) {
      // 이미 DB에 존재하면 PUT, 신규면 POST
      const exists = await fetch(API_BASE + `/api/techs/${tech.id}`).then(r => r.ok).catch(() => false);
      const ok = await apiSaveTech(tech, itemId, !exists);
      if (!ok) console.warn('saveTechDetail: 저장 실패 (tech.id=', tech.id, ')');
    }
  } else {
    saveToStorage();
  }
  openTechDetailSubModal(currentTechDetailIdx + 1);
}
function skipTechDetail() {
  openTechDetailSubModal(currentTechDetailIdx + 1);
}

// ─── 트렌드 카드 편집 모달 ──────────────────────────────
function openTrendEditModal(techId) {
  const found = findTech(techId);
  if (!found) return;
  const { tech, item } = found;
  document.getElementById('trendModalTitle').textContent = '편집: ' + tech.title;
  document.getElementById('tEditTitle').value = tech.title;
  document.getElementById('tEditCat').value = item.name;
  document.getElementById('tEditCat').disabled = true;
  document.getElementById('tEditAsis').value = tech.asis || '';
  document.getElementById('tEditAsisSub').value = tech.asis_sub || '';
  document.getElementById('tEditTobe').value = tech.tobe || '';
  document.getElementById('tEditTobeSub').value = tech.tobe_sub || '';
  document.getElementById('tEditMgrA').value = tech.mgr_a || item.mgr_a;
  document.getElementById('tEditMgrB').value = tech.mgr_b || item.mgr_b;
  initCenterDropdown('tEditCenterPicker', [...tech.centers]);
  initCapsList_trend(tech.caps);
  // API 업로드용 섹션 정보 주입
  const tSection = Object.entries(MAP_DATA).find(([,arr]) => arr.some(i => i.techs.some(t => t.id === techId)));
  document.getElementById('tEditCapsList').dataset.section = tSection ? tSection[0] : 'core';
  document.getElementById('trendEditModal').classList.add('show');
  document.getElementById('trendEditModal').dataset.techId = techId;
}

function initCapsList_trend(caps) {
  const container = document.getElementById('tEditCapsList');
  container.innerHTML = '';
  caps.forEach((c, i) => addCapRow(container, c, i));
  if (caps.length === 0) addCapRow(container, {title:'',image:null}, 0);
}
function addTrendCapRowBtn() {
  const container = document.getElementById('tEditCapsList');
  addCapRow(container, {title:'',image:null}, container.children.length);
}
function getTrendCapValues() {
  const rows = document.querySelectorAll('#tEditCapsList .cap-edit-row');
  const caps = [];
  rows.forEach(row => {
    const title = row.querySelector('.cap-title-input').value.trim();
    if (title) caps.push({ title, image: row.dataset.image || null });
  });
  return caps;
}

function closeTrendEditModal() {
  document.getElementById('trendEditModal').classList.remove('show');
}

async function saveTrendEditModal() {
  const uploadingRows = document.querySelectorAll('#tEditCapsList .cap-edit-row[data-uploading="1"]');
  if (uploadingRows.length > 0) {
    alert('이미지 업로드 중입니다. 잠시 후 다시 저장해주세요. (버튼이 "변경"으로 바뀌면 완료)');
    return;
  }

  const techId = document.getElementById('trendEditModal').dataset.techId;
  const found = findTech(techId);
  if (!found) return;
  const tech = found.tech;
  tech.title = document.getElementById('tEditTitle').value.trim() || tech.title;
  tech.asis = document.getElementById('tEditAsis').value.trim();
  tech.asis_sub = document.getElementById('tEditAsisSub').value.trim();
  tech.tobe = document.getElementById('tEditTobe').value.trim();
  tech.tobe_sub = document.getElementById('tEditTobeSub').value.trim();
  tech.mgr_a = document.getElementById('tEditMgrA').value.trim();
  tech.mgr_b = document.getElementById('tEditMgrB').value.trim();
  tech.centers = getCenterValues('tEditCenterPicker');
  tech.caps = getTrendCapValues();
  if (USE_API) {
    const ok = await apiSaveTech(tech, found.item.id, false);
    if (ok === 'pending') {
      // Manager 승인 대기: 로컬 변경 되돌리기 (DB에서 최신 로드)
      await loadFromStorage();
      loadPendingCards();
      renderMap();
      renderAllTrendTabs();
      closeTrendEditModal();
      return;
    }
    if (!ok) {
      alert('저장에 실패했습니다. 콘솔(F12)에서 오류를 확인해주세요.');
      return;
    }
  } else {
    saveToStorage();
  }
  renderMap();
  renderAllTrendTabs();
  closeTrendEditModal();
}

async function deleteTrendCard() {
  const techId = document.getElementById('trendEditModal').dataset.techId;
  const found = findTech(techId);
  if (!found) return;
  if (!confirm('"' + found.tech.title + '" 카드를 삭제하시겠습니까?\n역량맵의 유망기술에서도 제거됩니다.')) return;
  if (USE_API) {
    const res = await apiDeleteTech(techId);
    if (res === 'pending') {
      await loadFromStorage();
      loadPendingCards();
      renderMap();
      renderAllTrendTabs();
      closeTrendEditModal();
      return;
    }
  }
  found.item.techs = found.item.techs.filter(t => t.id !== techId);
  if (!USE_API) {
    saveToStorage();
  }
  renderMap();
  renderAllTrendTabs();
  closeTrendEditModal();
}

// ─── 관리자 토글 ─────────────────────────────────────────
function toggleAdmin() {
  if (currentUser) {
    // 이미 로그인 상태 → 로그아웃
    logout();
  } else {
    // 비로그인 → 로그인 모달 표시
    if (USE_API) {
      openLoginModal();
    } else {
      // localStorage 모드 (로컬 파일): 기존처럼 단순 토글
      isAdmin = !isAdmin;
      if (isAdmin) {
        document.getElementById('adminBtn').classList.add('is-admin');
        document.getElementById('adminBtnText').textContent = '편집 모드 ON';
        document.getElementById('adminBanner').classList.add('show');
        document.querySelectorAll('.admin-only').forEach(el => el.style.display = '');
        document.body.classList.add('admin-mode');
      } else {
        document.getElementById('adminBtn').classList.remove('is-admin');
        document.getElementById('adminBtnText').textContent = '관리자 모드';
        document.getElementById('adminBanner').classList.remove('show');
        document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'none');
        document.body.classList.remove('admin-mode');
      }
      renderMap();
      renderAllTrendTabs();
    }
  }
}

// ─── 탭 / 네비게이션 ────────────────────────────────────
var TAB_LABELS = {
  't-overview': 'KETI AI 기술·인력 역량 현황',
  't-core':     'AI 핵심기술 트렌드 및 KETI 보유 역량',
  't-base':     'AI 기반기술 트렌드 및 KETI 보유 역량',
  't-fusion':   'AI 융합기술 트렌드 및 KETI 보유 역량'
};
var _currentTechName = 'AI';

function updateBreadcrumbTab(tabId) {
  var bc = document.querySelector('.breadcrumb');
  if (!bc) return;
  var label = TAB_LABELS[tabId] || '';
  if (label) {
    bc.innerHTML = '전략기술 역량 대시보드 <span>&rsaquo; ' + _currentTechName + ' &rsaquo; ' + label + '</span>';
  } else {
    bc.innerHTML = '전략기술 역량 대시보드 <span>&rsaquo; ' + _currentTechName + '</span>';
  }
}

function switchTab(el, tabId) {
  hideAdminPages();
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
  updateBreadcrumbTab(tabId);
  var mainEl = document.querySelector('main.main');
  if (mainEl && mainEl.classList.contains('non-ai-mode')) return;
  ['t-overview','t-core','t-base','t-fusion'].forEach(id => {
    const el2 = document.getElementById(id);
    if (el2) el2.style.display = 'none';
  });
  const target = document.getElementById(tabId);
  if (target) {
    if (tabId === 't-overview') {
      target.style.display = 'flex';
      target.style.flex = '1';
      target.style.minHeight = '0';
      target.style.overflowY = 'hidden';
    } else {
      target.style.display = 'block';
      target.style.flex = '1';
      target.style.minHeight = '0';
      target.style.overflowY = 'auto';
      target.style.padding = '4px 2px 20px';
    }
  }
}

function selectTech(el, name) {
  hideAdminPages();
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
  el.classList.add('active');
  _currentTechName = name;
  document.getElementById('pageTitle').innerHTML =
    name + ' 유망기술 트렌드 및 KETI 보유역량 <span class="page-badge">v2.0</span>';
  var metaEl = document.querySelector('.page-meta');
  if (name === 'AI') {
    metaEl.style.display = '';
    var totalTechs = allSections().reduce((s,sec) => s + MAP_DATA[sec].reduce((ss,i) => ss + i.techs.length, 0), 0);
    metaEl.innerHTML = '<span class="online-dot"></span><span>최종 업데이트: 2025.12.10</span><span class="meta-sep">|</span><span>' + MAP_DATA.core.length + '개 핵심 · ' + MAP_DATA.base.length + '개 기반 · ' + (MAP_DATA.fusion_left.length + MAP_DATA.fusion_right.length) + '개 융합</span>';
  } else {
    metaEl.style.display = 'none';
  }
  var mainEl = document.querySelector('main.main');
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  var firstBtn = document.querySelector('.tab-btn');
  if (firstBtn) firstBtn.classList.add('active');
  document.querySelectorAll('.main > [id^="t-"]').forEach(t => { t.style.display = 'none'; });
  var ov = document.getElementById('t-overview');
  if (ov) ov.style.display = '';
  if (name === 'AI') {
    if (mainEl) mainEl.classList.remove('non-ai-mode');
    updateBreadcrumbTab('t-overview');
    // AI 탭 이름 원래대로 복원
    const coreCount = (MAP_DATA.core || []).length;
    const baseCount = (MAP_DATA.base || []).length;
    const fusionCount = ((MAP_DATA.fusion_left || []).length + (MAP_DATA.fusion_right || []).length);
    _setTabNames('AI', coreCount, baseCount, fusionCount);
  } else {
    document.getElementById('phTitle').textContent = name + ' 기술 트렌드 & 보유역량';
    if (mainEl) mainEl.classList.add('non-ai-mode');
    document.querySelector('.breadcrumb').innerHTML =
      '전략기술 역량 대시보드 <span>&rsaquo; ' + name + '</span>';
    _setTabNames(name, 0, 0, 0);
  }
}

function _setTabNames(techName, coreCount, baseCount, fusionCount) {
  const prefix = techName === 'AI' ? 'AI' : techName;
  const ovBtn = document.getElementById('tabBtn-overview');
  const coreBtn = document.getElementById('tabBtn-core');
  const baseBtn = document.getElementById('tabBtn-base');
  const fusionBtn = document.getElementById('tabBtn-fusion');
  if (ovBtn) ovBtn.innerHTML = `KETI ${prefix} 기술·인력 역량 현황 <span class="tab-count">맵</span>`;
  if (coreBtn) coreBtn.innerHTML = `${prefix} 핵심기술 트렌드 및 KETI 보유 역량 <span class="tab-count">${coreCount || ''}</span>`;
  if (baseBtn) baseBtn.innerHTML = `${prefix} 기반기술 트렌드 및 KETI 보유 역량 <span class="tab-count">${baseCount || ''}</span>`;
  if (fusionBtn) fusionBtn.innerHTML = `${prefix} 융합기술 트렌드 및 KETI 보유 역량 <span class="tab-count">${fusionCount || ''}</span>`;
}


// ─── 관리 페이지: 변경 이력 / 담당자 권한 ────────────────
function showAdminPage(pageId) {
  document.querySelectorAll('.admin-page').forEach(p => p.classList.remove('active'));
  ['t-overview','t-core','t-base','t-fusion'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  const ph = document.querySelector('.page-header');
  if (ph) ph.style.display = 'none';
  const tb = document.querySelector('.tab-bar');
  if (tb) tb.style.display = 'none';
  const banner = document.getElementById('adminBanner');
  if (banner) banner.style.display = 'none';
  const tabNav = document.querySelector('.tab-nav');
  if (tabNav) tabNav.style.display = 'none';
  // 비AI 영역 placeholder도 숨김
  const placeholder = document.getElementById('techPlaceholder');
  if (placeholder) placeholder.style.display = 'none';
  document.getElementById(pageId).classList.add('active');

  // 사이드바 관리 메뉴 활성화 표기
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const menuId = pageId === 'approvalPage' ? 'approvalMenuItem' : 'permMenuItem';
  const menuEl = document.getElementById(menuId);
  if (menuEl) menuEl.classList.add('active');

  if (pageId === 'approvalPage') loadApprovals();
  if (pageId === 'permPage')     loadUsers();
}

function hideAdminPages() {
  document.querySelectorAll('.admin-page').forEach(p => p.classList.remove('active'));
  const ph = document.querySelector('.page-header');
  if (ph) ph.style.display = '';
  const tb = document.querySelector('.tab-bar');
  if (tb) tb.style.display = '';
  const banner = document.getElementById('adminBanner');
  if (banner) banner.style.display = '';
  const tabNav = document.querySelector('.tab-nav');
  if (tabNav) tabNav.style.display = '';
  // 비AI 영역이면 placeholder 복원
  const mainEl = document.querySelector('main.main');
  if (mainEl && mainEl.classList.contains('non-ai-mode')) {
    const placeholder = document.getElementById('techPlaceholder');
    if (placeholder) placeholder.style.display = '';
  }
  // 관리 메뉴 활성화 해제
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
}

let _approvalStatus = 'pending';
function switchApprovalTab(el, status) {
  document.querySelectorAll('.approval-tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  _approvalStatus = status;
  loadApprovals();
}

async function loadApprovals() {
  if (!USE_API || !currentUser) return;
  const status = _approvalStatus;

  // 역할별 설명 문구 동적 설정
  const descEl = document.getElementById('approvalPageDesc');
  if (descEl) {
    descEl.textContent = currentUser.role === 'admin'
      ? 'Manager가 요청한 변경사항을 검토하고 승인/반려할 수 있습니다.'
      : '요청한 변경사항을 검토하고 승인/반려 현황을 확인할 수 있습니다.';
  }

  try {
    const [pendRes, appRes, rejRes] = await Promise.all([
      fetch(API_BASE + '/api/approvals?status=pending', { headers: authHeaders() }),
      fetch(API_BASE + '/api/approvals?status=approved', { headers: authHeaders() }),
      fetch(API_BASE + '/api/approvals?status=rejected', { headers: authHeaders() })
    ]);
    const [pendList, appList, rejList] = await Promise.all([pendRes.json(), appRes.json(), rejRes.json()]);

    const statsEl = document.getElementById('approvalStats');
    statsEl.innerHTML = `
      <div class="approval-stat-card stat-clickable" onclick="switchToApprovalStatus('pending')" title="승인 대기 목록 보기">
        <div class="approval-stat-num" style="color:var(--navy)">${pendList.length}</div>
        <div class="approval-stat-label">승인 대기</div>
      </div>
      <div class="approval-stat-card stat-clickable" onclick="switchToApprovalStatus('approved')" title="승인 완료 목록 보기">
        <div class="approval-stat-num" style="color:var(--green)">${appList.length}</div>
        <div class="approval-stat-label">승인 완료</div>
      </div>
      <div class="approval-stat-card stat-clickable" onclick="switchToApprovalStatus('rejected')" title="반려 목록 보기">
        <div class="approval-stat-num" style="color:var(--text-4)">${rejList.length}</div>
        <div class="approval-stat-label">반려</div>
      </div>`;

    const list = {pending: pendList, approved: appList, rejected: rejList}[status] || [];
    const area = document.getElementById('approvalList');
    if (!list.length) {
      area.innerHTML = `<div style="color:var(--text-4);padding:40px;text-align:center;background:var(--white);border-radius:10px;border:1px solid var(--border)">
        <svg class="approval-empty-icon" viewBox="0 0 48 48" fill="none"><rect x="8" y="4" width="32" height="40" rx="3" stroke="currentColor" stroke-width="2.5"/><path d="M16 16h16M16 24h16M16 32h10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
        <div style="font-size:15px">${status==='pending'?'승인 대기 중인 변경사항이 없습니다.':status==='approved'?'승인된 변경사항이 없습니다.':'반려된 변경사항이 없습니다.'}</div>
      </div>`;
      return;
    }

    let html = '';
    list.forEach(pc => {
      const date = new Date(pc.created_at).toLocaleString('ko-KR');
      const actionLabel = {CREATE:'추가',UPDATE:'수정',DELETE:'삭제'}[pc.action] || pc.action;
      const typeLabel = {tech:'유망기술',map_item:'기술명',cap:'보유역량'}[pc.target_type] || pc.target_type;
      const targetName = pc.after_data?.title || pc.after_data?.name || pc.before_data?.title || pc.target_id;

      let diffHtml = '';
      if (pc.action === 'UPDATE' && pc.before_data && pc.after_data) {
        let beforeLines = '', afterLines = '';
        const fields = ['title','asis','asis_sub','tobe','tobe_sub','centers','mgr_a','mgr_b'];
        const labels = {title:'제목',asis:'AS-IS',asis_sub:'AS-IS 소제목',tobe:'TO-BE',tobe_sub:'TO-BE 소제목',centers:'연구센터',mgr_a:'담당자(정)',mgr_b:'담당자(부)'};
        fields.forEach(f => {
          let bv = pc.before_data[f];
          let av = pc.after_data[f];
          // 배열(연구센터 등)은 쉼표로 연결해 문자열로 비교
          if (Array.isArray(bv)) bv = bv.join(', ');
          if (Array.isArray(av)) av = av.join(', ');
          bv = bv || '-'; av = av || '-';
          if (String(bv) !== String(av)) {
            beforeLines += `<div><b>${labels[f]||f}:</b> ${esc(String(bv))}</div>`;
            afterLines  += `<div><b>${labels[f]||f}:</b> ${esc(String(av))}</div>`;
          }
        });
        if (beforeLines) {
          diffHtml = `<div class="approval-card-body">
            <div class="approval-diff before"><div class="approval-diff-label">변경 전</div>${beforeLines}</div>
            <div class="approval-diff after"><div class="approval-diff-label">변경 후</div>${afterLines}</div>
          </div>`;
        }
      } else if (pc.action === 'CREATE' && pc.after_data) {
        const d = pc.after_data;
        const centerStr = Array.isArray(d.centers) ? d.centers.join(', ') : (d.centers || '');
        diffHtml = `<div style="padding:10px 14px;background:var(--sky-pale);border:1px solid var(--sky-light);border-radius:8px;font-size:13px;margin-bottom:14px">
          <div class="approval-diff-label">새 항목</div>
          <div><b>제목:</b> ${esc(d.title||'')}</div>
          ${d.asis ? `<div><b>AS-IS:</b> ${esc(d.asis)}</div>` : ''}
          ${d.asis_sub ? `<div style="padding-left:12px;color:var(--text-3)"><b>↳ 소제목:</b> ${esc(d.asis_sub)}</div>` : ''}
          ${d.tobe ? `<div><b>TO-BE:</b> ${esc(d.tobe)}</div>` : ''}
          ${d.tobe_sub ? `<div style="padding-left:12px;color:var(--text-3)"><b>↳ 소제목:</b> ${esc(d.tobe_sub)}</div>` : ''}
          ${centerStr ? `<div><b>연구센터:</b> ${esc(centerStr)}</div>` : ''}
        </div>`;
      } else if (pc.action === 'DELETE') {
        diffHtml = `<div style="padding:10px 14px;background:var(--surface);border:1px solid var(--border);border-radius:8px;font-size:13px;margin-bottom:14px">
          <div class="approval-diff-label">삭제 요청</div>
          <div>대상: ${esc(targetName)}</div>
        </div>`;
      }

      const badgeColor = pc.status==='pending' ? 'var(--navy)' : pc.status==='approved' ? 'var(--green)' : 'var(--text-4)';
      // 상태 뱃지 클릭 → 해당 승인 탭 활성화
      const statusBadge = `<span class="pending-badge" style="background:${badgeColor};cursor:pointer"
        title="${pc.status==='pending'?'승인대기 목록 보기':pc.status==='approved'?'승인완료 목록 보기':'반려 목록 보기'}"
        onclick="event.stopPropagation();switchToApprovalStatus('${pc.status}')">${actionLabel}</span>`;

      let actions = '';
      if (status === 'pending') {
        if (currentUser.role === 'admin') {
          actions = `<div class="approval-card-actions">
            <button class="admin-btn approve" onclick="event.stopPropagation();approveChange(${pc.id})">승인</button>
            <button class="admin-btn reject" onclick="event.stopPropagation();rejectChange(${pc.id})">반려</button>
          </div>`;
        } else {
          actions = `<div class="approval-card-actions">
            <button class="admin-btn reject" onclick="event.stopPropagation();cancelPendingChange(${pc.id})">요청 취소</button>
          </div>`;
        }
      } else if (status === 'approved' && currentUser.role === 'admin') {
        actions = `<div class="approval-card-actions">
          <button class="admin-btn reject" onclick="event.stopPropagation();undoApprovedChange(${pc.id})">이력 취소</button>
        </div>`;
      }

      const reviewInfo = pc.review_comment && pc.review_comment !== '요청자 취소'
        ? `<div style="font-size:13px;color:var(--text-4);margin-top:8px;padding:8px 12px;background:var(--surface);border-radius:6px">반려 사유: ${esc(pc.review_comment)}</div>` : '';

      const tabTarget = pc.target_type === 'map_item' ? 't-overview' : _findTechTab(pc.target_id);

      html += `<div class="approval-card" onclick="navigateToApprovalTarget('${tabTarget}','${esc(pc.target_id)}')">
        <div class="approval-card-head">
          <div class="approval-card-meta">
            ${statusBadge}
            <span class="requester" style="font-size:15px">${esc(pc.requester_name||'')}</span>
            <span style="color:var(--text-3);font-size:14px">${typeLabel} · <strong>${esc(targetName)}</strong></span>
            <span class="date" style="font-size:13px">${date}</span>
          </div>
          <div style="font-size:12px;color:var(--text-4)">클릭하면 기술 카드로 이동</div>
        </div>
        ${diffHtml}
        ${reviewInfo}
        ${actions}
      </div>`;
    });
    area.innerHTML = html;
  } catch(e) {
    document.getElementById('approvalList').innerHTML = '<div style="color:#E53E3E;padding:20px">로드 실패: ' + e.message + '</div>';
  }
}

async function approveChange(id) {
  if (!confirm('이 변경사항을 승인하시겠습니까?')) return;
  try {
    const res = await fetch(API_BASE + `/api/approvals/${id}/approve`, {
      method: 'POST', headers: authJsonHeaders(), body: JSON.stringify({})
    });
    if (res.ok) {
      alert('승인 완료! 변경사항이 반영되었습니다.');
      loadApprovals();
      await loadFromStorage();
      loadPendingCards();
      renderMap();
      renderAllTrendTabs();
    } else {
      const err = await res.json();
      alert('승인 실패: ' + (err.error || ''));
    }
  } catch(e) { alert('승인 처리 오류: ' + e.message); }
}

async function rejectChange(id) {
  const comment = prompt('반려 사유를 입력해주세요:');
  if (comment === null) return;
  try {
    const res = await fetch(API_BASE + `/api/approvals/${id}/reject`, {
      method: 'POST', headers: authJsonHeaders(), body: JSON.stringify({ comment })
    });
    if (res.ok) { alert('반려 완료.'); loadApprovals(); loadPendingCards(); }
    else { const err = await res.json(); alert('반려 실패: ' + (err.error || '')); }
  } catch(e) { alert('반려 처리 오류: ' + e.message); }
}

async function cancelPendingChange(id) {
  if (!confirm('이 변경 요청을 취소하시겠습니까?')) return;
  try {
    const res = await fetch(API_BASE + `/api/approvals/${id}/cancel`, {
      method: 'POST', headers: authJsonHeaders(), body: JSON.stringify({})
    });
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      alert('취소 실패: 서버 응답 오류 (백엔드 재배포가 필요할 수 있습니다)');
      return;
    }
    const data = await res.json();
    if (res.ok) { alert('요청이 취소되었습니다.'); loadApprovals(); loadPendingCards(); renderMap(); renderAllTrendTabs(); }
    else { alert('취소 실패: ' + (data.error || '')); }
  } catch(e) { alert('취소 처리 오류: ' + e.message); }
}

function switchToApprovalStatus(status) {
  const tab = document.querySelector(`.approval-tab[data-status="${status}"]`);
  if (tab) switchApprovalTab(tab, status);
  else {
    _approvalStatus = status;
    loadApprovals();
  }
}

async function undoApprovedChange(id) {
  if (!confirm('이 승인된 변경 이력을 취소하시겠습니까?\n(실제 데이터는 변경되지 않으며 이력 상태만 취소로 표기됩니다.)')) return;
  try {
    const res = await fetch(API_BASE + `/api/approvals/${id}/undo`, {
      method: 'POST',
      headers: authJsonHeaders(),
      body: JSON.stringify({})
    });
    if (!res.headers.get('content-type')?.includes('application/json')) {
      throw new Error('서버 응답 오류 (백엔드 재배포 필요)');
    }
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || '취소 실패');
    loadApprovals();
  } catch(e) { alert('이력 취소 오류: ' + e.message); }
}

function _findTechTab(techId) {
  for (const sec of Object.keys(MAP_DATA)) {
    for (const item of MAP_DATA[sec]) {
      for (const tech of item.techs) {
        if (tech.id === techId) {
          if (sec === 'core') return 't-core';
          if (sec === 'base') return 't-base';
          return 't-fusion';
        }
      }
    }
  }
  return 't-overview';
}

function navigateToApprovalTarget(tabId, targetId) {
  hideAdminPages();
  const tabBtn = document.querySelector(`.tab-btn[onclick*="${tabId}"]`);
  switchTab(tabBtn, tabId);
  setTimeout(() => {
    const card = document.querySelector(`[data-id="${targetId}"], [data-tech-id="${targetId}"]`);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.style.transition = 'box-shadow 0.3s';
      card.style.boxShadow = '0 0 0 3px var(--navy-m)';
      setTimeout(() => { card.style.boxShadow = ''; }, 2000);
    }
  }, 200);
}

function filterUserList() {
  const q = (document.getElementById('userSearchInput')?.value || '').toLowerCase();
  const rows = document.querySelectorAll('#userListArea tbody tr');
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(q) ? '' : 'none';
  });
}

// ─── 담당자 권한 설정 ─────────────────────────────────────
const SECTION_LABELS = {
  core: 'AI 핵심기술',
  base: 'AI 기반기술',
  fusion_left: 'AI 융합기술',
  fusion_right: 'AI 융합기술'
};

function getUserScopeDisplay(u) {
  if (u.role === 'admin') return '<span class="scope-chip" style="background:var(--sky-pale);color:var(--navy);border-color:var(--sky-light)">전체 권한</span>';
  const chips = [];
  for (const [sec, items] of Object.entries(MAP_DATA)) {
    const secLabel = SECTION_LABELS[sec] || sec;
    for (const item of items) {
      const itemMgr = item.mgr_a === u.name || item.mgr_b === u.name;
      if (itemMgr) {
        chips.push(`${secLabel} > ${item.name}`);
        continue;
      }
      for (const tech of item.techs) {
        if (tech.mgr_a === u.name || tech.mgr_b === u.name) {
          chips.push(`${secLabel} > ${item.name} > ${tech.title}`);
        }
      }
    }
  }
  if (!chips.length) return '<span style="color:var(--text-4);font-size:13px">미지정</span>';
  return '<div class="scope-chips">' + chips.map(c => `<span class="scope-chip">${esc(c)}</span>`).join('') + '</div>';
}

async function loadUsers() {
  if (!USE_API || !currentUser || currentUser.role !== 'admin') return;
  try {
    const res  = await fetch(API_BASE + '/api/users', { headers: authHeaders() });
    const list = await res.json();
    const area = document.getElementById('userListArea');

    if (!list.length) {
      area.innerHTML = `<div style="color:var(--text-4);padding:32px;text-align:center;background:var(--white);border-radius:10px;border:1px solid var(--border);font-size:14px">등록된 사용자가 없습니다.</div>`;
      return;
    }

    let html = `<table class="admin-table"><thead><tr>
      <th style="width:36px">ID</th>
      <th style="min-width:90px">이름</th>
      <th style="min-width:160px">이메일</th>
      <th style="width:90px">역할</th>
      <th style="text-align:left">권한 범위</th>
      <th style="width:80px">상태</th>
      <th style="width:130px;white-space:nowrap">활성화 여부</th>
      <th style="width:110px">등록일</th>
      <th style="width:110px">수정일</th>
      <th style="width:60px">관리</th>
    </tr></thead><tbody>`;
    list.forEach(u => {
      const createdAt = u.created_at ? new Date(u.created_at).toLocaleDateString('ko-KR') : '-';
      const updatedAt = u.updated_at ? new Date(u.updated_at).toLocaleDateString('ko-KR') : '-';
      const statusChip = u.is_active
        ? `<span style="display:inline-block;padding:3px 10px;border-radius:12px;font-size:12px;font-weight:600;background:var(--green-bg);color:var(--green);border:1px solid var(--green-bd)">활성</span>`
        : `<span style="display:inline-block;padding:3px 10px;border-radius:12px;font-size:12px;font-weight:600;background:var(--surface);color:var(--text-4);border:1px solid var(--border)">비활성</span>`;
      const toggleLabel = u.is_active ? '비활성화' : '활성화';
      html += `<tr>
        <td style="color:var(--text-4)">${u.id}</td>
        <td style="font-weight:600;font-size:15px">${esc(u.name)}</td>
        <td style="color:var(--text-3)">${esc(u.email || '-')}</td>
        <td><span class="role-tag ${u.role}">${u.role === 'admin' ? 'Admin' : 'Manager'}</span></td>
        <td style="text-align:left">${getUserScopeDisplay(u)}</td>
        <td>${statusChip}</td>
        <td style="white-space:nowrap">
          <button class="admin-btn" style="font-size:13px;white-space:nowrap" onclick="toggleUserActive(${u.id})">${toggleLabel}</button>
        </td>
        <td class="date-cell">${createdAt}</td>
        <td class="date-cell">${updatedAt}</td>
        <td>
          <button class="admin-btn" style="font-size:13px;white-space:nowrap" onclick='openEditUserModal(${JSON.stringify(u)})'>수정</button>
        </td>
      </tr>`;
    });
    html += '</tbody></table>';
    area.innerHTML = html;
  } catch(e) {
    document.getElementById('userListArea').innerHTML = '<div style="color:#E53E3E;padding:20px">로드 실패: ' + e.message + '</div>';
  }
}

async function toggleUserActive(id) {
  try {
    const res = await fetch(API_BASE + `/api/users/${id}/toggle-active`, {
      method: 'PATCH', headers: authJsonHeaders(), body: JSON.stringify({})
    });
    const ct = res.headers.get('content-type') || '';
    if (!ct.includes('application/json')) {
      alert('서버 응답 오류입니다. 백엔드 재배포가 필요할 수 있습니다.');
      return;
    }
    const d = await res.json();
    if (res.ok) { loadUsers(); }
    else { alert(d.error || '상태 변경 실패'); }
  } catch(e) { alert('오류: ' + e.message); }
}

function toggleScopeUI() {
  const role = document.getElementById('umRole').value;
  const sec  = document.getElementById('scopeSection');
  if (role === 'admin') {
    sec.innerHTML = `<label class="form-label" style="margin-top:8px">권한 범위</label>
      <div style="padding:16px;background:var(--sky-pale);border-radius:8px;font-size:14px;color:var(--navy);font-weight:500;text-align:center">
        Admin은 모든 영역의 전체 편집 권한이 자동 부여됩니다.
      </div>`;
  } else {
    buildScopeTree();
  }
}

/**
 * buildScopeTree — 3단계 계층 권한 트리
 * 레벨1: section (AI 핵심기술 등)
 * 레벨2: map_item (학습지능 등)
 * 레벨3: tech (머신러닝 등)
 *
 * editable=true 일 때:
 *  - 섹션 체크 → 하위 item + tech 모두 체크/해제
 *  - item 체크 → 하위 tech 모두 체크/해제
 *  - 하위 모두 해제 시 상위 자동 해제 (indeterminate 표시)
 */
function buildScopeTree(selectedName, editable) {
  const container = document.getElementById('scopeSection');
  if (!container) return;

  const editNote = editable
    ? '<p style="font-size:13px;color:var(--text-4);margin:4px 0 12px">항목을 체크하면 해당 담당자(부)로 지정됩니다. 상위 체크 시 하위 전체 선택됩니다.</p>'
    : '<p style="font-size:13px;color:var(--text-4);margin:4px 0 12px">현재 담당자(정/부)로 지정된 항목을 표시합니다.</p>';

  let html = `<label class="form-label" style="margin-top:8px;font-size:14px">권한 범위</label>${editNote}`;

  for (const [section, items] of Object.entries(MAP_DATA)) {
    const secLabel = SECTION_LABELS[section] || section;

    // 섹션 단위: 하위 item 중 하나라도 담당이면 indeterminate, 모두면 checked
    let secChecked = false, secSome = false;
    if (selectedName) {
      const mgrd = items.filter(i => i.mgr_a === selectedName || i.mgr_b === selectedName);
      if (mgrd.length === items.length && items.length > 0) { secChecked = true; secSome = true; }
      else if (mgrd.length > 0 || items.some(i => i.techs.some(t => t.mgr_a === selectedName || t.mgr_b === selectedName))) {
        secSome = true;
      }
    }

    if (editable) {
      html += `<details class="scope-tree-group" open>
        <summary>
          <div class="scope-check-item" style="display:inline-flex;margin:0">
            <input type="checkbox" id="sc_sec_${section}" data-type="section" data-section="${section}"
              ${secChecked ? 'checked' : ''}
              onchange="scopeToggleSection(this,'${section}')">
            <label for="sc_sec_${section}" style="font-size:14px;font-weight:700;cursor:pointer;color:var(--text-1)">${esc(secLabel)}</label>
          </div>
        </summary>
        <div class="scope-tree-items">`;
    } else {
      html += `<details class="scope-tree-group" open>
        <summary style="font-size:14px;font-weight:700;color:var(--text-1);padding:4px 0">${esc(secLabel)}</summary>
        <div class="scope-tree-items">`;
    }

    for (const item of items) {
      const isMgr = selectedName && (item.mgr_a === selectedName || item.mgr_b === selectedName);
      const techsChecked = selectedName ? item.techs.filter(t => t.mgr_a === selectedName || t.mgr_b === selectedName).length : 0;
      const techsAll = item.techs.length > 0 && techsChecked === item.techs.length;

      if (editable) {
        html += `<div class="scope-check-item${isMgr ? ' checked' : ''}" style="padding-left:20px">
          <input type="checkbox" id="sc_item_${item.id}" data-type="item" data-id="${item.id}" data-section="${section}"
            ${isMgr ? 'checked' : ''}
            onchange="scopeToggleItem(this,'${item.id}','${section}')">
          <label for="sc_item_${item.id}" style="flex:1;cursor:pointer;font-size:14px">${esc(item.name)}</label>
        </div>`;
      } else {
        html += `<div class="scope-tree-item" style="padding-left:20px;${isMgr?'background:var(--sky-pale);border-radius:4px;font-weight:600':''}">
          <span style="font-size:14px">${esc(item.name)}</span>
          <span style="font-size:11px;color:var(--text-4);margin-left:auto">${esc(item.mgr_a||'')} / ${esc(item.mgr_b||'')}</span>
        </div>`;
      }

      if (item.techs.length) {
        if (editable) {
          html += `<div class="scope-check-sub" id="sc_sub_${item.id}">`;
        } else {
          html += '<div class="scope-tree-sub">';
        }
        for (const t of item.techs) {
          const tMgr = selectedName && (t.mgr_a === selectedName || t.mgr_b === selectedName);
          const tHigh = tMgr || isMgr;
          if (editable) {
            html += `<div class="scope-check-item${tMgr || isMgr ? ' checked' : ''}" style="padding-left:40px">
              <input type="checkbox" id="sc_tech_${t.id}" data-type="tech" data-id="${t.id}" data-item="${item.id}" data-section="${section}"
                ${tMgr || isMgr ? 'checked' : ''}
                onchange="scopeToggleTech(this,'${item.id}','${section}')">
              <label for="sc_tech_${t.id}" style="flex:1;cursor:pointer;font-size:13px;color:var(--text-2)">${esc(t.title)}</label>
            </div>`;
          } else {
            html += `<div class="scope-tree-item" style="padding-left:40px;font-size:13px;${tHigh?'background:#EBF8FF;border-radius:4px;font-weight:500;color:var(--navy)':'color:var(--text-3)'}">
              <span>${esc(t.title)}</span>
              <span style="font-size:11px;color:var(--text-4);margin-left:auto">${esc(t.mgr_a||'')} / ${esc(t.mgr_b||'')}</span>
            </div>`;
          }
        }
        html += '</div>';
      }
    }
    html += '</div></details>';
  }
  container.innerHTML = html;

  // indeterminate 처리
  if (editable) _updateScopeIndeterminate();
}

function _updateScopeIndeterminate() {
  for (const [section, items] of Object.entries(MAP_DATA)) {
    const secCb = document.getElementById(`sc_sec_${section}`);
    if (!secCb) continue;
    let allChecked = true, anyChecked = false;
    for (const item of items) {
      const itemCb = document.getElementById(`sc_item_${item.id}`);
      if (itemCb?.checked) { anyChecked = true; } else { allChecked = false; }
      for (const t of item.techs) {
        const techCb = document.getElementById(`sc_tech_${t.id}`);
        if (techCb?.checked) { anyChecked = true; } else { allChecked = false; }
      }
    }
    secCb.checked = allChecked && anyChecked;
    secCb.indeterminate = !allChecked && anyChecked;

    for (const item of items) {
      const itemCb = document.getElementById(`sc_item_${item.id}`);
      if (!itemCb) continue;
      let allT = true, anyT = false;
      for (const t of item.techs) {
        const techCb = document.getElementById(`sc_tech_${t.id}`);
        if (techCb?.checked) { anyT = true; } else { allT = false; }
      }
      if (item.techs.length > 0) {
        itemCb.indeterminate = !allT && anyT && !itemCb.checked;
      }
    }
  }
}

function scopeToggleSection(cb, section) {
  const items = MAP_DATA[section] || [];
  items.forEach(item => {
    const itemCb = document.getElementById(`sc_item_${item.id}`);
    if (itemCb) { itemCb.checked = cb.checked; itemCb.indeterminate = false; }
    item.techs.forEach(t => {
      const techCb = document.getElementById(`sc_tech_${t.id}`);
      if (techCb) techCb.checked = cb.checked;
    });
  });
  _syncScopeItemStyles();
}

function scopeToggleItem(cb, itemId, section) {
  const items = MAP_DATA[section] || [];
  const item = items.find(i => i.id === itemId);
  if (item) {
    item.techs.forEach(t => {
      const techCb = document.getElementById(`sc_tech_${t.id}`);
      if (techCb) techCb.checked = cb.checked;
    });
  }
  _updateScopeIndeterminate();
  _syncScopeItemStyles();
}

function scopeToggleTech(cb, itemId, section) {
  _updateScopeIndeterminate();
  _syncScopeItemStyles();
}

function _syncScopeItemStyles() {
  document.querySelectorAll('#scopeSection .scope-check-item').forEach(row => {
    const cb = row.querySelector('input[type=checkbox]');
    if (cb?.checked) row.classList.add('checked');
    else row.classList.remove('checked');
  });
}

function scopeCheckChanged(cb) {
  const row = cb.closest('.scope-check-item');
  if (cb.checked) row.classList.add('checked');
  else row.classList.remove('checked');
}

let _scopeEditUserId = null;
function openScopeEditModal(u) {
  _scopeEditUserId = u.id;
  document.getElementById('userModalTitle').textContent = '권한 범위 수정: ' + u.name;
  document.getElementById('umUserId').value = u.id;
  document.getElementById('umName').value = u.name;
  document.getElementById('umEmail').value = u.email || '';
  document.getElementById('umPassword').value = '';
  document.getElementById('umPassword').placeholder = '변경 시에만 입력';
  document.getElementById('umRole').value = u.role;
  if (u.role === 'admin') {
    toggleScopeUI();
  } else {
    buildScopeTree(u.name, true);
  }
  document.getElementById('userModal').classList.add('show');
}

async function saveScopeFromModal() {
  const userName = document.getElementById('umName').value.trim();
  if (!userName) { alert('사용자 이름이 없습니다.'); return; }

  const getChecked = (id) => {
    const cb = document.getElementById(id);
    return cb ? cb.checked : false;
  };

  try {
    const itemPromises = [];
    for (const [sec, items] of Object.entries(MAP_DATA)) {
      for (const item of items) {
        const itemChecked = getChecked(`sc_item_${item.id}`);
        const curMgrB = item.mgr_b || '';
        const hasMgr = curMgrB === userName;
        // 체크됐는데 아직 지정 안 된 경우 → 추가
        if (itemChecked && !hasMgr) {
          itemPromises.push(fetch(API_BASE + `/api/map/items/${item.id}`, {
            method: 'PUT', headers: authJsonHeaders(),
            body: JSON.stringify({ ...item, mgr_b: userName })
          }));
        // 체크 해제됐는데 지정되어 있는 경우 → 제거
        } else if (!itemChecked && hasMgr) {
          itemPromises.push(fetch(API_BASE + `/api/map/items/${item.id}`, {
            method: 'PUT', headers: authJsonHeaders(),
            body: JSON.stringify({ ...item, mgr_b: '' })
          }));
        }

        for (const tech of item.techs) {
          const techChecked = getChecked(`sc_tech_${tech.id}`);
          const tCurMgrB = tech.mgr_b || '';
          const tHas = tCurMgrB === userName;
          if (techChecked && !tHas) {
            itemPromises.push(fetch(API_BASE + `/api/techs/${tech.id}`, {
              method: 'PUT', headers: authJsonHeaders(),
              body: JSON.stringify({ ...tech, item_id: item.id, mgr_b: userName })
            }));
          } else if (!techChecked && tHas) {
            itemPromises.push(fetch(API_BASE + `/api/techs/${tech.id}`, {
              method: 'PUT', headers: authJsonHeaders(),
              body: JSON.stringify({ ...tech, item_id: item.id, mgr_b: '' })
            }));
          }
        }
      }
    }
    await Promise.all(itemPromises);
    alert('권한 범위가 저장되었습니다.');
    document.getElementById('userModal').classList.remove('show');
    await loadFromStorage();
    renderMap();
    renderAllTrendTabs();
    loadUsers();
  } catch(e) { alert('저장 오류: ' + e.message); }
}

function openAddUserModal() {
  document.getElementById('userModalTitle').textContent = '사용자 추가';
  document.getElementById('umUserId').value = '';
  document.getElementById('umName').value = '';
  document.getElementById('umEmail').value = '';
  document.getElementById('umPassword').value = '';
  document.getElementById('umPassword').placeholder = '비밀번호';
  document.getElementById('umRole').value = 'manager';
  toggleScopeUI();
  document.getElementById('userModal').classList.add('show');
}

function openEditUserModal(u) {
  document.getElementById('userModalTitle').textContent = '사용자 수정: ' + u.name;
  document.getElementById('umUserId').value = u.id;
  document.getElementById('umName').value = u.name;
  document.getElementById('umEmail').value = u.email || '';
  document.getElementById('umPassword').value = '';
  document.getElementById('umPassword').placeholder = '변경 시에만 입력';
  document.getElementById('umRole').value = u.role;
  if (u.role === 'admin') {
    toggleScopeUI();
  } else {
    buildScopeTree(u.name);
  }
  document.getElementById('userModal').classList.add('show');
}

async function saveUser() {
  const id = document.getElementById('umUserId').value;

  const body = {
    name:     document.getElementById('umName').value.trim(),
    email:    document.getElementById('umEmail').value.trim(),
    role:     document.getElementById('umRole').value,
    password: document.getElementById('umPassword').value
  };
  if (!body.name) { alert('이름을 입력해주세요.'); return; }

  try {
    const isNew = !id;
    if (isNew && !body.password) { alert('비밀번호를 입력해주세요.'); return; }
    if (!isNew && !body.password) delete body.password;

    const url    = isNew ? API_BASE + '/api/users' : API_BASE + `/api/users/${id}`;
    const method = isNew ? 'POST' : 'PUT';
    const res = await fetch(url, { method, headers: authJsonHeaders(), body: JSON.stringify(body) });
    const data = await res.json();
    if (!res.ok) { alert(data.error || '저장 실패'); return; }

    // Manager인 경우 (신규/수정 모두) 권한 범위도 함께 저장
    if (body.role !== 'admin') {
      await saveScopeFromModal();
      return; // saveScopeFromModal에서 모달 닫음
    }

    document.getElementById('userModal').classList.remove('show');
    loadUsers();
  } catch(e) { alert('저장 오류: ' + e.message); }
}

// ─── PDF 다운로드 ──────────────────────────────────────────
const KETI_LOGO_URL = GITHUB_RAW + '/Image/KETI_CI%EA%B5%AD%EC%98%81%EB%AC%B8---%EC%96%B4%EB%91%90%EB%B0%B0%EA%B2%BD2.png';

function _pdfDateStr() {
  const d = new Date();
  return `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
}

function _pdfFileName(prefix) {
  return prefix + '_' + _pdfDateStr().replace(/\./g,'') + '.pdf';
}

async function _loadLogoAsDataUrl() {
  try {
    const res = await fetch(KETI_LOGO_URL, { mode: 'cors' });
    const blob = await res.blob();
    return await new Promise(r => { const reader = new FileReader(); reader.onload = () => r(reader.result); reader.readAsDataURL(blob); });
  } catch { return null; }
}

function _buildPdfHeader(logoDataUrl, title, width) {
  const h = document.createElement('div');
  h.className = 'pdf-header';
  h.style.width = width + 'px';
  h.innerHTML = `
    ${logoDataUrl ? `<img src="${logoDataUrl}" class="pdf-header-logo" alt="KETI">` : '<span style="font-weight:800;color:#1E3A5F">KETI</span>'}
    <span class="pdf-header-title">${esc(title)}</span>
    <span class="pdf-header-date">${_pdfDateStr()}</span>`;
  return h;
}

// ── PDF 푸터를 캔버스로 렌더링 (한글 깨짐 방지) ──
async function _renderFooterCanvas(text, pageStr, width) {
  const el = document.createElement('div');
  el.className = 'pdf-container';
  el.style.width = width + 'px';
  el.innerHTML = `<div class="pdf-footer" style="width:${width}px"><span>${esc(text)}</span><span>${esc(pageStr)}</span></div>`;
  document.body.appendChild(el);
  await new Promise(r => setTimeout(r, 50));
  const c = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
  document.body.removeChild(el);
  return c;
}

// ── 역량맵 PDF ──────────────────────────────────────────
async function downloadMapPdf() {
  const btn = document.querySelector('.map-panel-hd .btn-pdf');
  const svgIcon = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1v9m0 0L5 7m3 3l3-3M2 12v1.5A1.5 1.5 0 003.5 15h9a1.5 1.5 0 001.5-1.5V12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  if (btn) { btn.disabled = true; btn.innerHTML = '<span class="spinner-s"></span> 생성 중...'; }

  try {
    const { jsPDF } = window.jspdf;
    const logoDataUrl = await _loadLogoAsDataUrl();
    const MAP_W = 1400;

    // 원래 웹 레이아웃 그대로 통합 렌더링
    const container = document.createElement('div');
    container.className = 'pdf-container';
    container.style.width = MAP_W + 'px';
    container.appendChild(_buildPdfHeader(logoDataUrl, 'KETI AI 기술·인력 역량 현황', MAP_W));

    const mapClone = document.getElementById('techMap').cloneNode(true);
    mapClone.querySelectorAll('.map-add-btn, .mc-edit-btn, .admin-only').forEach(el => el.remove());
    mapClone.style.minWidth = '0';
    mapClone.style.width = '100%';
    container.appendChild(mapClone);

    document.body.appendChild(container);
    await new Promise(r => setTimeout(r, 500));

    // 모든 카드(.mc)의 하단 Y좌표를 수집 → 안전 분할점 후보
    const containerTop = container.getBoundingClientRect().top;
    const containerH = container.offsetHeight;
    const allCards = mapClone.querySelectorAll('.mc');
    const cardRects = [];
    allCards.forEach(c => {
      const r = c.getBoundingClientRect();
      cardRects.push({ top: r.top - containerTop, bottom: r.bottom - containerTop });
    });

    // 모든 카드 하단 Y 중, 어떤 카드도 걸치지 않는 Y만 안전 분할점
    const candidateYs = [...new Set(cardRects.map(r => r.bottom))].sort((a, b) => a - b);
    const safeBreaks = candidateYs.filter(y =>
      !cardRects.some(r => r.top < y && y < r.bottom)
    );

    // 전체를 하나의 캔버스로 캡처
    const canvas = await html2canvas(container, { scale: 2, useCORS: true, allowTaint: false, backgroundColor: '#ffffff' });
    document.body.removeChild(container);

    const pxScale = canvas.height / containerH;
    const canvasBreaks = safeBreaks.map(bp => Math.round(bp * pxScale));

    // jsPDF 조립
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    const pdfW = pdf.internal.pageSize.getWidth();
    const pdfH = pdf.internal.pageSize.getHeight();
    const margin = 5;
    const contentW = pdfW - margin * 2;
    const contentH = pdfH - margin * 2;
    const maxSlicePx = Math.floor(contentH * canvas.width / contentW);

    let yOff = 0;
    let pageNum = 0;

    while (yOff < canvas.height) {
      if (canvas.height - yOff <= maxSlicePx) {
        const sliceH = canvas.height - yOff;
        if (pageNum > 0) pdf.addPage();
        const slice = document.createElement('canvas');
        slice.width = canvas.width; slice.height = sliceH;
        slice.getContext('2d').drawImage(canvas, 0, yOff, canvas.width, sliceH, 0, 0, canvas.width, sliceH);
        pdf.addImage(slice.toDataURL('image/jpeg', 0.92), 'JPEG', margin, margin, contentW, (sliceH / canvas.width) * contentW);
        yOff = canvas.height;
      } else {
        // 페이지 한계 내에서 가장 먼 안전 분할점 찾기
        let bestBreak = -1;
        for (let i = canvasBreaks.length - 1; i >= 0; i--) {
          if (canvasBreaks[i] > yOff && canvasBreaks[i] <= yOff + maxSlicePx) {
            bestBreak = canvasBreaks[i];
            break;
          }
        }
        const sliceEnd = bestBreak > 0 ? bestBreak : yOff + maxSlicePx;
        const sliceH = sliceEnd - yOff;

        if (pageNum > 0) pdf.addPage();
        const slice = document.createElement('canvas');
        slice.width = canvas.width; slice.height = sliceH;
        slice.getContext('2d').drawImage(canvas, 0, yOff, canvas.width, sliceH, 0, 0, canvas.width, sliceH);
        pdf.addImage(slice.toDataURL('image/jpeg', 0.92), 'JPEG', margin, margin, contentW, (sliceH / canvas.width) * contentW);
        yOff = sliceEnd;
      }
      pageNum++;
    }

    // 푸터 (한글 캔버스 렌더링) - 콘텐츠 아래에 배치
    const total = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= total; i++) {
      pdf.setPage(i);
      const fCanvas = await _renderFooterCanvas('KETI 기술역량 대시보드', `${i} / ${total}`, MAP_W);
      const fH = (fCanvas.height / fCanvas.width) * contentW;
      pdf.addImage(fCanvas.toDataURL('image/jpeg', 0.92), 'JPEG', margin, pdfH - fH - 2, contentW, fH);
    }

    pdf.save(_pdfFileName('KETI_AI_역량맵'));
  } catch (err) {
    console.error('Map PDF 생성 오류:', err);
    alert('PDF 생성 중 오류가 발생했습니다. 콘솔(F12)을 확인하세요.');
  } finally {
    if (btn) { btn.disabled = false; btn.innerHTML = svgIcon + ' PDF'; }
  }
}

// ── 트렌드 탭 PDF ──────────────────────────────────────
function _buildPdfCard(tech, parentItem, type) {
  const mgrA = tech.mgr_a || parentItem.mgr_a || '';
  const mgrB = tech.mgr_b || parentItem.mgr_b || '';
  const chipClass = 'pdf-chip-' + type;
  const tobeClass = 'pdf-tobe-' + type;
  const tobeTagClass = 'pdf-tag-tobe-' + type;
  const borderClass = 'pdf-border-' + type;

  const hasImages = tech.caps && tech.caps.some(c => c.image);
  let capsHtml;
  if (hasImages) {
    capsHtml = `<div class="pdf-caps-grid">${tech.caps.map(c =>
      `<div class="pdf-cap-item">${c.image ? `<img src="${esc(resolveImgUrl(c.image))}" alt="${esc(c.title)}">` : '<div style="width:120px;height:90px;background:#F3F4F6;border-radius:6px;border:1px solid #E5E9F0;display:flex;align-items:center;justify-content:center"><span style="font-size:10px;color:#9CA3AF">No Image</span></div>'}<span>${esc(c.title)}</span></div>`
    ).join('')}</div>`;
  } else if (tech.caps && tech.caps.length) {
    capsHtml = `<div class="pdf-caps-chips">${tech.caps.map(c => `<span class="pdf-cap-chip">${esc(c.title)}</span>`).join('')}</div>`;
  } else {
    capsHtml = '<span style="font-size:11px;color:#9CA3AF">-</span>';
  }

  const centersHtml = (tech.centers || []).map(c => `<span class="pdf-center-chip">${esc(c)}</span>`).join('');

  return `<div class="pdf-card ${borderClass}">
  <div class="pdf-card-head">
    <div>
      <div class="pdf-card-title">${esc(tech.title)}</div>
      <div class="pdf-card-mgr">정: ${esc(mgrA)} &nbsp; 부: ${esc(mgrB)}</div>
    </div>
    <span class="pdf-card-chip ${chipClass}">${esc(parentItem.name)}</span>
  </div>
  <div class="pdf-card-body">
    <div class="pdf-flow-row">
      <div class="pdf-flow-block pdf-asis">
        <div class="pdf-flow-tag pdf-tag-asis">AS-IS</div>
        <div class="pdf-flow-title">${esc(tech.asis || '')}</div>
        ${tech.asis_sub ? `<div class="pdf-flow-sub">${esc(tech.asis_sub)}</div>` : ''}
      </div>
      <div class="pdf-flow-arrow">→</div>
      <div class="pdf-flow-block ${tobeClass}">
        <div class="pdf-flow-tag ${tobeTagClass}">TO-BE</div>
        <div class="pdf-flow-title">${esc(tech.tobe || '')}</div>
        ${tech.tobe_sub ? `<div class="pdf-flow-sub">${esc(tech.tobe_sub)}</div>` : ''}
      </div>
    </div>
    <div class="pdf-caps-section">
      <div class="pdf-caps-label">KETI 보유역량</div>
      ${capsHtml}
    </div>
  </div>
  <div class="pdf-card-foot">
    <div class="pdf-centers-label">연구센터</div>
    <div class="pdf-centers-chips">${centersHtml || '<span style="font-size:10px;color:#9CA3AF">-</span>'}</div>
  </div>
</div>`;
}

async function downloadTrendPdf(tabId, sections, title) {
  const filterBar = document.querySelector(`.filter-bar[data-tab="${tabId}"]`);
  const btn = filterBar ? filterBar.querySelector('.btn-pdf') : null;
  const svgIcon = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1v9m0 0L5 7m3 3l3-3M2 12v1.5A1.5 1.5 0 003.5 15h9a1.5 1.5 0 001.5-1.5V12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  if (btn) { btn.disabled = true; btn.innerHTML = '<span class="spinner-s"></span> 생성 중...'; }

  try {
    const { jsPDF } = window.jspdf;
    const logoDataUrl = await _loadLogoAsDataUrl();
    const PAGE_W = 800;
    const dateStr = _pdfDateStr();

    const allItems = [];
    sections.forEach(sec => {
      (MAP_DATA[sec] || []).forEach(item => {
        const type = sectionType(sec);
        item.techs.forEach(tech => allItems.push({ tech, item, type }));
      });
    });

    const categoryMap = new Map();
    allItems.forEach(({ tech, item, type }) => {
      const key = item.name;
      if (!categoryMap.has(key)) categoryMap.set(key, { item, type, techs: [] });
      categoryMap.get(key).techs.push(tech);
    });
    const categories = [...categoryMap.entries()];

    // ── 표지 페이지 ──
    const coverEl = document.createElement('div');
    coverEl.className = 'pdf-container';
    coverEl.style.width = PAGE_W + 'px';
    coverEl.innerHTML = `<div class="pdf-cover" style="width:${PAGE_W}px">
      ${logoDataUrl ? `<img src="${logoDataUrl}" class="pdf-cover-logo" alt="KETI">` : '<div style="font-size:28px;font-weight:900;color:#1E3A5F;margin-bottom:24px">KETI</div>'}
      <div class="pdf-cover-title">${esc(title)}</div>
      <div class="pdf-cover-date">${dateStr}</div>
      <div class="pdf-cover-toc">
        <div class="pdf-cover-toc-title">목차</div>
        ${categories.map(([name], i) =>
          `<div class="pdf-cover-toc-item"><span>${i+1}. ${esc(name)}</span></div>`
        ).join('')}
      </div>
    </div>`;
    document.body.appendChild(coverEl);
    await new Promise(r => setTimeout(r, 200));
    const coverCanvas = await html2canvas(coverEl, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
    document.body.removeChild(coverEl);

    // ── 카드별 개별 캡처 (잘림 방지) ──
    const cardImages = [];
    for (const [catName, data] of categories) {
      const hdrEl = document.createElement('div');
      hdrEl.className = 'pdf-container';
      hdrEl.style.width = PAGE_W + 'px';
      hdrEl.style.padding = '0 24px';
      const hdr = document.createElement('div');
      hdr.className = 'pdf-section-header pdf-sec-' + data.type;
      hdr.textContent = catName;
      hdrEl.appendChild(hdr);
      document.body.appendChild(hdrEl);
      await new Promise(r => setTimeout(r, 100));
      const hdrCanvas = await html2canvas(hdrEl, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
      document.body.removeChild(hdrEl);
      cardImages.push({ canvas: hdrCanvas, isSectionHeader: true, catName });

      for (const tech of data.techs) {
        const cardEl = document.createElement('div');
        cardEl.className = 'pdf-container';
        cardEl.style.width = PAGE_W + 'px';
        cardEl.style.padding = '0 24px 12px';
        cardEl.innerHTML = _buildPdfCard(tech, data.item, data.type);
        document.body.appendChild(cardEl);
        await new Promise(r => setTimeout(r, 150));
        const cardCanvas = await html2canvas(cardEl, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
        document.body.removeChild(cardEl);
        cardImages.push({ canvas: cardCanvas, isSectionHeader: false, catName });
      }
    }

    // ── jsPDF 조립: 카드 단위로 배치하여 잘림 방지 ──
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pdfW = pdf.internal.pageSize.getWidth();
    const pdfH = pdf.internal.pageSize.getHeight();
    const margin = 5;
    const footerH = 6;
    const contentW = pdfW - margin * 2;
    const usableH = pdfH - margin * 2 - footerH;

    // 표지
    const coverImgH = (coverCanvas.height / coverCanvas.width) * contentW;
    pdf.addImage(coverCanvas.toDataURL('image/jpeg', 0.92), 'JPEG', margin, margin, contentW, Math.min(coverImgH, usableH));

    let curY = margin;
    let needNewPage = true;

    for (const item of cardImages) {
      const imgH = (item.canvas.height / item.canvas.width) * contentW;

      if (item.isSectionHeader) {
        pdf.addPage();
        curY = margin;
        needNewPage = false;
        pdf.addImage(item.canvas.toDataURL('image/jpeg', 0.92), 'JPEG', margin, curY, contentW, imgH);
        curY += imgH;
      } else {
        if (needNewPage) {
          pdf.addPage();
          curY = margin;
          needNewPage = false;
        }

        if (curY + imgH > margin + usableH) {
          pdf.addPage();
          curY = margin;
        }

        pdf.addImage(item.canvas.toDataURL('image/jpeg', 0.92), 'JPEG', margin, curY, contentW, imgH);
        curY += imgH;
      }
    }

    // 푸터 (한글 캔버스 렌더링)
    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      const fCanvas = await _renderFooterCanvas('KETI 기술역량 대시보드', `${i} / ${totalPages}`, PAGE_W);
      const fImgH = (fCanvas.height / fCanvas.width) * contentW;
      pdf.addImage(fCanvas.toDataURL('image/jpeg', 0.92), 'JPEG', margin, pdfH - margin - fImgH, contentW, fImgH);
    }

    const filePrefix = tabId === 't-core' ? 'KETI_AI_핵심기술' : tabId === 't-base' ? 'KETI_AI_기반기술' : 'KETI_AI_융합기술';
    pdf.save(_pdfFileName(filePrefix));
  } catch (err) {
    console.error('Trend PDF 생성 오류:', err);
    alert('PDF 생성 중 오류가 발생했습니다. 콘솔(F12)을 확인하세요.');
  } finally {
    if (btn) { btn.disabled = false; btn.innerHTML = svgIcon + ' PDF'; }
  }
}

// ─── 초기화 ──────────────────────────────────────────────
(async function init() {
  // 저장된 토큰으로 세션 복구
  const savedToken = localStorage.getItem('authToken');
  const savedUser  = localStorage.getItem('currentUser');
  if (savedToken && savedUser) {
    authToken   = savedToken;
    currentUser = JSON.parse(savedUser);
    applyLoginState();
  }

  await loadFromStorage();
  renderMap();
  renderAllTrendTabs();
  const _ov = document.getElementById('t-overview');
  if (_ov) _ov.style.display = 'flex';
  updateBreadcrumbTab('t-overview');
})();
