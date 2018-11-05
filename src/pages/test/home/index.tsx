import * as React from "react"
import { Ant } from "../../../components/Ant"
import axios from '../../../utils/axios'

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
        <Ant name="home" company="mobike" />
    )
  }
}

export const Home = _Home