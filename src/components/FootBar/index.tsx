import * as React from "react"
import './index.less'
const imgSrc = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565256163938&di=1142a1e0d6d004fab6e6bc0d7a63edbc&imgtype=0&src=http%3A%2F%2Fwww.wndhw.com%2Ffengjing%2Ftouxiang%2Fimages%2Ftx001t1.jpg'

export interface FootBarProps {
  info: {
    avatar: string,
    userName: String,
  },
  flexed?: Boolean,
  wxClickCb: () => void,
  phoneClickCb: () => void,
}

export class FootBar extends React.Component<FootBarProps, {}> {
  render() {
    const { info, flexed = false } = this.props
    const {
      avatar = imgSrc,
      userName = '铁蛋',
    } = info
    return (
      <div className={`contact ${flexed}`}>
        <div className='contact-info'>
          <div className='contact-info-avatar'>
            <img src={avatar} alt='头像'/>
          </div>

          <div className='contact-info-user'>
            <div className='contact-info-job'>发布者</div>
            <div className={`contact-info-name`}>{userName}</div>
          </div>
        </div>
        <div className='contact-box'>
          <span className='contact-item wechat'>
            <img src={imgSrc} alt='wechat_bottom'/>加微信
          </span>
          <span className='contact-item phone' >
            <img src={imgSrc} alt='phone_bottom' />打电话
          </span>
        </div>
      </div>
    )
  }
}