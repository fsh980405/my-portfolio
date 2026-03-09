import React from 'react';
import styles from './index.module.scss';

const Contact = () => {
  return (
    <div className={styles.contactContainer} id="contact">
      <div className={styles.background}>
        <div className={styles.autoWrapper}>
          <div className={`${styles.blob} ${styles.blob1}`} />
          <div className={`${styles.blob} ${styles.blob2}`} />
          <div className={`${styles.blob} ${styles.blob3}`} />
          <div className={`${styles.blob} ${styles.blob4}`} />
        </div>
        
        <div className={styles.contentWrapper}>
          <div className={styles.contactInfo}>
            <div className={styles.sectionHeader}>
              <img src="/image/contact/header_icon_new.svg" className={styles.icon} alt="Contact" />
              <p className={styles.title}>联系我</p>
            </div>

            <div className={styles.contactGrid}>
              <div className={styles.contactItem}>
                <div className={styles.iconCircle}>
                  <img src="/image/contact/mail_icon_new.svg" alt="Email" />
                </div>
                <div className={styles.textGroup}>
                  <p className={styles.label}>邮箱</p>
                  <p className={styles.value}>184986352@qq.com</p>
                </div>
              </div>
              
              <div className={styles.contactItem}>
                <div className={styles.iconCircle}>
                  <img src="/image/contact/phone_icon_new.svg" alt="Phone" />
                </div>
                <div className={styles.textGroup}>
                  <p className={styles.label}>电话</p>
                  <p className={styles.value}>15513881391</p>
                </div>
              </div>
              
              <div className={styles.contactItem}>
                <div className={styles.iconCircle}>
                  <img src="/image/contact/wechat_icon_new.svg" alt="WeChat" />
                </div>
                <div className={styles.textGroup}>
                  <p className={styles.label}>微信</p>
                  <p className={styles.value}>15513881391</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.manifestoSection}>
        <div className={styles.metaInfo}>
          <p className={styles.metaText}>[2026网页]</p>
          <p className={styles.metaText}>[FSH · Vibe]</p>
        </div>

        <div className={styles.mainText}>
          <p>
            过去，我总被一个问题困住：<br/>
            我脑子里的设计风格、我的视觉语言、我的个人 Vibe，永远没法 100% 还原成真实网页。<br/>
            设计师想做赛博、复古、科技、极简、未来感…… 前端做出来总是 “差点意思”。<br/>
            直到我开始用 Claude Code 直接链接 Figma。<br/>
            这不是工具搭配，这是设计师真正掌控自己作品的开始。
          </p>

          <p>
            我不按组件库、不按模板、不迁就实现。<br/>
            我只输出我的审美、我的节奏、我的语言
          </p>

          <p>
            我是一名专注体验与视觉的 UI/UX 设计师。<br/>
            我不只是做界面，我在创造可被感知的风格与氛围。<br/>
            借助 Figma × Claude Code，我打破设计与实现的边界，<br/>
            将独属于我的 Vibe—— 赛博、科技、复古、未来 ——<br/>
            完整、精准、毫无损耗地还原成网页。<br/>
            我的作品集，不是被实现的。<br/>
            是被我 “Vibe” 出来的。
          </p>
        </div>

        <div className={styles.signatureSection}>
          <p className={styles.role}>
            ui·ux设计师,<br/>
            冯夙航
          </p>
          <img src="/image/contact/signature_new.png" className={styles.signatureImage} alt="Signature" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
