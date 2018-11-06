import * as React from "react"
import { Ant } from "components/Ant"
import axios from 'utils/axios'
// const testImg = require('images/erwei.jpg')
const testImg = 'https://static.mobike.com/wx/distribution-banner-normal-3ae3892650.png'

export interface AntProps {
  name: string
  company: string
}

export class _Home extends React.Component<AntProps, {}> {
  componentDidMount() {
    return axios.post('/login.do', {}).then((res:Object) => {
        console.log(res)
    });
  }
  render() {
    return (
      <div>
        <Ant name="home" company="mobike" />
        <a href={testImg} download="img" >下载图片</a>
      </div>
    )
  }
}

export const Home = _Home