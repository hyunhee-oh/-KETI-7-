/**
 * seed.js — DEFAULT_MAP_DATA를 PostgreSQL에 초기 데이터로 삽입
 * 실행: node seed.js
 */
require('dotenv').config();
const pool = require('./db');

// ─── DEFAULT_MAP_DATA (dashboard.js 와 동일) ─────────────
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

async function seed() {
  console.log('DB 연결 시도 중...');
  let client;
  try {
    client = await pool.connect();
  } catch(connErr) {
    console.error('DB 연결 실패:', connErr.message);
    console.error('  host:', process.env.DB_HOST, '/ port:', process.env.DB_PORT);
    console.error('  user:', process.env.DB_USER, '/ db:', process.env.DB_NAME);
    throw connErr;
  }
  try {
    await client.query('BEGIN');
    console.log('시드 데이터 삽입 시작...');

    for (const [section, items] of Object.entries(DEFAULT_MAP_DATA)) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        await client.query(
          `INSERT INTO map_items (id, section, name, count, centers, mgr_a, mgr_b, sort_order)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
           ON CONFLICT (id) DO NOTHING`,
          [item.id, section, item.name, item.count, item.centers, item.mgr_a, item.mgr_b, i]
        );
        for (let j = 0; j < item.techs.length; j++) {
          const tech = item.techs[j];
          await client.query(
            `INSERT INTO techs (id, item_id, title, asis, tobe, centers, mgr_a, mgr_b, sort_order)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
             ON CONFLICT (id) DO NOTHING`,
            [tech.id, item.id, tech.title, tech.asis, tech.tobe, tech.centers, tech.mgr_a, tech.mgr_b, j]
          );
          for (let k = 0; k < tech.caps.length; k++) {
            const cap = tech.caps[k];
            // ../Image/ 상대경로를 Image/ 로 변환하여 저장
            const imgPath = cap.image ? cap.image.replace(/^\.\.\//, '') : null;
            await client.query(
              `INSERT INTO caps (tech_id, title, image_path, sort_order)
               VALUES ($1,$2,$3,$4)`,
              [tech.id, cap.title, imgPath, k]
            );
          }
        }
        console.log(`  [${section}] ${item.name} 삽입 완료`);
      }
    }

    await client.query('COMMIT');
    console.log('시드 데이터 삽입 완료!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('시드 오류:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch((err) => {
  console.error('시드 실패:', err.message);
  process.exit(1);
});
