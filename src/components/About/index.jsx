import React, { useState } from 'react';
import styles from './index.module.scss';
import { playMechanicalSound } from '../../utils/audio';
import ProfileCard from './ProfileCard';

const About = () => {
  const [activeTab, setActiveTab] = useState('work'); // 'work' or 'project'

  const playHoverSound = () => {
    playMechanicalSound();
  };

  const workExperiences = [
    {
      period: '2025.06 - 至今',
      company: '吉利人才集团',
      role: 'UED体验设计师 - AI + 职业教育',
      description: [
        'AI教育产品设计：负责吉利人才集团AI大模型在职业教育应用、教育及智能体产品的全端（PC端/移动端/HW智慧屏端）全链路UED设计，覆盖企业员工职业发展、高校人才培养、社会求职精准统计三大核心场景，针对不同用户群体的差异需求与AI产品的使用习惯，打造极具智能化、专业化与易用性的智能教育服务界面。',
        '深度挖掘体验：基于用户学习行为数据，深度挖掘AI驱动的个性化教学价值，优化AI多模态交互、个性化学习路径规划、智能错题诊断、技能图谱推荐等核心功能的体验方案，降低用户AI产品使用门槛与学习成本，提升知识吸收效率与产品用户粘性。',
        '跨部门协作：深度联动产品、算法、研发、业务等多部门并主导需求评审与方案评审，将复杂的AI模型能力边界与职业教育业务核心诉求，转化为直观易懂的交互逻辑、可视化的与全场景服务流程，确保AI功能落地的准确性、流畅性与体验一致性。',
        '设计体系搭建：主导建立AI教育场景、教育智能体全业务视角的标准化设计语言与规范体系，输出高质量的UI/UX设计规范、可视化的设计组件库全端设计指南，助力团队高效完成产品快速迭代，保障多端产品在视觉体验、操作逻辑上的一致性、专业性与品牌识别度。'
      ]
    },
    {
      period: '2023.08 - 2025.01',
      company: '华泰证券',
      role: 'UED体验设计师 - 金融业',
      description: [
        '金融产品设计：负责华泰证券涨乐财富通平台及全端（PC端/移动端/H5）证券交易及财富管理产品的交互与视觉设计，针对个人投资者及机构客户不同需求，打造极具专业性与易用性的投顾服务界面。',
        '用户体验优化：基于用户交易行为数据及投资偏好分析，优化交易流程、理财推荐等核心功能设计方案，提升用户投资决策效率，产品用户满意度提升15%。',
        '设计规范制定：建立适应证券业务场景标准化的设计语言与规范体系，输出高质量的设计规范设计指南，助力团队高效完成产品设计迭代，保障平台视觉与交互的一致性和专业性。'
      ]
    },
    {
      period: '2021.12 - 2023.08',
      company: '蚂蚁金服',
      role: 'UI/UX设计师 - 金融业',
      description: [
        '国际化产品设计：负责Alipay+跨境支付业务的B端及C端产品（PC端/移动端）的产品交互及视觉设计，满足不同国家用户的需求，解决国际化对本地化的不同设计偏好。',
        '数据驱动设计：根据产品功能及数据优化，制定设计决策，优化设计方案，产品用户留存率提升25%。',
        '设计体系建设：制定一套适用于多国扩展的设计规范设计指南，提供高质感的设计资产便于团队的设计及复用。'
      ]
    },
    {
      period: '2020.07 - 2021.12',
      company: '武汉酷学猴科技有限公司',
      role: 'UI设计师 - 培训/境外教育/教育领域',
      description: [
        '产品方案设计：分析、监控竞品变化，参与产品前期构思与创意环节，明确业务需求和用户需求，了解用户使用场景，制定设计目标，规划产品设计方案。',
        '界面视觉设计：根据需求文档产出高保真图输出，配合团队完成界面的设计工作，参与各阶段图的设计与制作，负责把控整体视觉及最后引导开发落地。',
        '用户体验优化：对界面进行定期优化和进行改版，测试验证产品的可用性，提高产品的易用性，参与版本迭代，产品易用性评分提升20%。'
      ]
    }
  ];

  const projectExperiences = [
    {
      period: '2025.06 - 至今',
      title: '芯位蜜线',
      background: '芯位蜜线是基于AI大语言模型与自研知识图谱的高等教育智能服务平台，作为"AI驱动的教育资源蜂巢"，是构建智慧教育生态的核心载体。',
      contribution: [
        '整合设计流程：负责平台的整体交互与视觉设计规划，结合前台展示、后台管理端的应用场景，优化页面布局与功能逻辑，拆解错题诊断器、个性化学习路径等核心模块体验路径，为智慧教育精细、敏捷、学习者三大视角入口。',
        '提升系统稳定：主导平台界面风格塑造，依据品牌气质构建高效有序的视觉，制定统一的色彩规范、字体与图标库、组件样式、交互反馈、为后续页面扩容、产品迭代及组件复用奠定良好基础。',
        '跨部门协作：深度参与平台内容策划，协同产品、运营、开发团队，将复杂的业务逻辑转化为直观易懂的图表形式、抽取核心数据指标转化为可视化的界面内容，挖掘产品亮点。'
      ],
      results: '成功打造了用户了解AI教育、应用智慧学习工具的发展窗口，平台上线后用户留存率达到85%，获得院校师生一致好评。'
    },
    {
      period: '2024.04 - 2025.01',
      title: '蔚蓝科技官网/官店',
      background: '蔚蓝机器狗官网是展示阿尔法机器狗等产品的核心线上平台，旨在向全球用户全面呈现机器狗的创新技术、多元功能及丰富应用场景。',
      contribution: [
        '用户体验设计：负责官网的整体交互与视觉设计规划，从用户浏览习惯出发，优化页面布局与导航逻辑，提升品牌展示、技术解析、用户案例等核心模块体验路径。',
        '品牌视觉塑造：主导官网界面风格塑造，依据品牌属性与视觉原则构建统一、极简为原则的特点，规范统一的视觉规范，如色彩体系、字体排版、插图设计等。',
        '技术内容转化：深度参与官网内容规划，协同产品、技术团队，将复杂的技术逻辑转化为通俗易懂的网传文案，挖掘产品亮点提高金融产品介绍。'
      ],
      results: '官网主要月访问量已突破50万次，产品咨询量提升40%，有效提升了品牌形象及信用产品智能转化。'
    },
    {
      period: '2023.08 - 2025.01',
      title: '华泰证券-涨乐财富通',
      background: '涨乐财富通是华泰证券自主研发的一站式财富管理服务平台，覆盖多终端，为个人投资者与机构客户提供证券交易、理财鉴证、资讯研报等多元化服务。',
      contribution: [
        '核心功能设计：负责平台增值交易、理财消费等核心功能模块的交互/视觉设计，通过优化界面布局与操作流程，保障产品的易用性与高效性。',
        '设计体系搭建：主导平台整体界面风格与视觉架构规范设计，输出高质量的设计方案，推进设计从需求到开发落地的全流程。',
        '用户体验分析：通过分析用户反馈行为数据，辨识体验痛点，优化筛选功能，同时协同各团队建立完整的统计指标体系。'
      ],
      results: '平台日活跃用户突破100万，用户交易渗透率稳定达到82%，成为行业领先的财富管理平台。'
    },
    {
      period: '2021.12 - 2023.08',
      title: 'iCEM - 全球客户体验监测平台',
      background: 'iCEM是由蚂蚁CTO设计事业部与体验团队为解决全球商业化的跨境客户问题质量监测平台，基于国际业务场景混合架构化产品的解决能力及工具趋势。',
      contribution: [
        '产品体验设计：设计并优化该产品，以提升客户体验为目标，围绕客户该产品与服务全生命周期中的各个触点体验，进行拆解和重组的系统性用回与管理。',
        '国际化设计：针对海外用户习惯和文化差异，设计符合国际化标准的粗犷界面和交互逻辑，确保产品在各市场的易用性。',
        '用户认知提升：通过用户研究和数据分析，持续优化产品功能和用户体验，提升客户满意度和忠诚度。'
      ],
      results: '平台成功服务全球50多个国家和地区的用户，客户留存率提升25%，成为企业新的增长点。'
    },
    {
      period: '2021.12 - 2023.08',
      title: 'A+ 合规平台',
      background: 'A+合规平台是一款面向Web、移动App应用服务全流程监测产品，基于蚂蚁数科底座，面向监管法规技术检测，帮助企业规避应用合规问题和安全风险。',
      contribution: [
        '页面视觉设计：负责该平台的交互/视觉设计，梳理产品的可用性流程和规范；为后续产品扩容提供界面复用。',
        '全局规范制定：定义整体界面及风格框架，产出交互及视觉及标准设计方案和组件，推进设计迭代及完整落地。',
        '用户需求洞察：参与该产品的规划创意，挖掘用户目标和真实需求，引导团队的专业化建设。'
      ],
      results: '平台累计检测应用10,000个应用，帮助企业合规通过率达到95%，获得行业广泛认可。'
    }
  ];

  return (
    <div className={styles.container} id="about">
      <div className={styles.frame1940698177}>
        <p className={styles.text}>关于我</p>
        <p className={styles.text2}>
          6年资深UI/UX设计师，专注于AI、金融科技领域的用户体验设计。
        </p>
      </div>
      
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <div className={styles.tabsContainer}>
            <button 
              className={`${styles.tabButton} ${activeTab === 'work' ? styles.active : ''}`}
              onClick={() => setActiveTab('work')}
              onMouseEnter={playHoverSound}
            >
              <div className={styles.overlay}>
                <div className={`${styles.corner} ${styles.topLeft}`}>
                  <div className={styles.focusLineH} />
                  <div className={styles.focusLineV} />
                  <div className={styles.accentLineH} />
                  <div className={styles.accentLineV} />
                </div>
                <div className={`${styles.corner} ${styles.bottomLeft}`}>
                  <div className={styles.focusLineH} />
                  <div className={styles.focusLineV} />
                  <div className={styles.accentLineH} />
                  <div className={styles.accentLineV} />
                </div>
                <div className={`${styles.corner} ${styles.topRight}`}>
                  <div className={styles.focusLineH} />
                  <div className={styles.focusLineV} />
                  <div className={styles.accentLineH} />
                  <div className={styles.accentLineV} />
                </div>
                <div className={`${styles.corner} ${styles.bottomRight}`}>
                  <div className={styles.focusLineH} />
                  <div className={styles.focusLineV} />
                  <div className={styles.accentLineH} />
                  <div className={styles.accentLineV} />
                </div>
              </div>
              <span className={styles.tabText}>工作经历</span>
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'project' ? styles.active : ''}`}
              onClick={() => setActiveTab('project')}
              onMouseEnter={playHoverSound}
            >
              <div className={styles.overlay}>
                <div className={`${styles.corner} ${styles.topLeft}`}>
                  <div className={styles.focusLineH} />
                  <div className={styles.focusLineV} />
                  <div className={styles.accentLineH} />
                  <div className={styles.accentLineV} />
                </div>
                <div className={`${styles.corner} ${styles.bottomLeft}`}>
                  <div className={styles.focusLineH} />
                  <div className={styles.focusLineV} />
                  <div className={styles.accentLineH} />
                  <div className={styles.accentLineV} />
                </div>
                <div className={`${styles.corner} ${styles.topRight}`}>
                  <div className={styles.focusLineH} />
                  <div className={styles.focusLineV} />
                  <div className={styles.accentLineH} />
                  <div className={styles.accentLineV} />
                </div>
                <div className={`${styles.corner} ${styles.bottomRight}`}>
                  <div className={styles.focusLineH} />
                  <div className={styles.focusLineV} />
                  <div className={styles.accentLineH} />
                  <div className={styles.accentLineV} />
                </div>
              </div>
              <span className={styles.tabText}>项目经历</span>
            </button>
          </div>
          
          <div className={styles.timeline}>
            {activeTab === 'work' ? (
              // Work Experience Content
              workExperiences.map((exp, index) => (
                <div key={index} className={styles.timelineItem}>
                  <div className={styles.period}>{exp.period}</div>
                  <div className={styles.details}>
                    <h3 className={styles.company}>{exp.company}</h3>
                    <div className={styles.role}>{exp.role}</div>
                    <ul className={styles.description}>
                      {exp.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              // Project Experience Content
              projectExperiences.map((project, index) => (
                <div key={index} className={styles.timelineItem}>
                  <div className={styles.period}>{project.period}</div>
                  <div className={styles.details}>
                    <h3 className={styles.company}>{project.title}</h3>
                    
                    <div className={styles.projectDetails}>
                      <div className={styles.projectSection}>
                        <h4>项目背景</h4>
                        <p>{project.background}</p>
                      </div>
                      
                      <div className={styles.projectSection}>
                        <h4>核心贡献</h4>
                        <ul>
                          {project.contribution.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className={styles.projectSection}>
                        <h4>项目成果</h4>
                        <p>{project.results}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className={styles.rightColumn}>
          <div className={styles.profileImageContainer}>
            <ProfileCard
              name="Feng Suhang"
              title="UX/UI Designer"
              handle="@fengsuhang"
              status="Online"
              contactText="Contact Me"
              avatarUrl="/image/avatar.png"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => window.location.href = 'mailto:fengsuhang@example.com'}
              behindGlowColor="rgba(125, 190, 255, 0.67)"
              behindGlowEnabled={true}
              innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
              className={styles.profileCard}
            />
          </div>
          
          <div className={styles.skills}>
             <h3 className={styles.skillTitle}>相关技能</h3>
             <p className={styles.skillText}>Figma, Sketch, Adobe XD, Photoshop, Illustrator, After Effects</p>
             <p className={styles.skillText}>HTML5, CSS3, JavaScript, AIGC工具应用</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
