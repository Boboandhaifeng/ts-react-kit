import * as React from "react"
import { Ant } from "components/Ant"
import { FootBar } from "components/FootBar/index.tsx"
import { Button } from "antd"
import axios from 'utils/axios'
import { downloadImage } from 'utils/utils'
// const testImg = require('images/erwei.jpg')
const testImg = 'https://static.mobike.com/wx/distribution-banner-normal-3ae3892650.png'
const defaultImg = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565256163938&di=1142a1e0d6d004fab6e6bc0d7a63edbc&imgtype=0&src=http%3A%2F%2Fwww.wndhw.com%2Ffengjing%2Ftouxiang%2Fimages%2Ftx001t1.jpg'

export interface AntProps {
  name: string
  company: string
}

export class _Home extends React.Component<AntProps, {}> {
  componentDidMount() {
    axios.post('/login.do', {}).then((res: Object) => {
        console.log(res)
    });
    this.watchStorage()
  }
  render() {
    const info = {
      avatar: defaultImg,
      userName: '铁蛋',
    }
    return (
      <div>
        <Ant name="home" company="mobike" />
        <FootBar info={info} wxClickCb={() => {}} phoneClickCb={() => {}} />
        {/* <div>
          <a href={testImg} download="img" >下载图片</a>
        </div> */}
        <Button type="primary" icon="download" onClick={this.download}>Download</Button>
        <Button type="primary" onClick={this.updateStorage}>updateStorage</Button>
        <a href='/api/download' >下载图片</a>
      </div>
    )
  }
  download() {
    downloadImage(testImg, 'testImg');
  }
  watchStorage() {
    window.addEventListener("storage", function (e) {
      console.log(e)
      console.log(e.newValue)
    })
  }
  updateStorage() {
    localStorage.setItem('aaa', (Math.random()*10).toString())
  }
}

export const Home = _Home