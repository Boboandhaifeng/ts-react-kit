import * as React from "react"
import { Ant } from "components/Ant"
import { Button } from "antd"
import axios from 'utils/axios'
import { downloadImage } from 'utils/utils'
// const testImg = require('images/erwei.jpg')
const testImg = 'https://static.mobike.com/wx/distribution-banner-normal-3ae3892650.png'

export interface AntProps {
  name: string
  company: string
}

export class _Home extends React.Component<AntProps, {}> {
  componentDidMount() {
    axios.post('/login.do', {}).then((res: Object) => {
        console.log(res)
    });
  }
  render() {
    return (
      <div>
        <Ant name="home" company="mobike" />
        {/* <div>
          <a href={testImg} download="img" >下载图片</a>
        </div> */}
        <Button type="primary" icon="download" onClick={this.download}>Download</Button>
      </div>
    )
  }
  download() {
    downloadImage(testImg, 'testImg');
  }
}

export const Home = _Home