// @flow
import React, { Component } from 'react';
import { BrowserHistory } from 'react-router';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';
// import { Login } from '../api';
const dialog = require('electron').remote.dialog;
const Logo = require('../../resources/icons/BSLogo.png');
const exec = require('child_process').exec;

type Props = {};



// 任何你期望执行的cmd命令，ls都可以

// 执行cmd命令的目录，如果使用cd xx && 上面的命令，这种将会无法正常退出子进程
let cmdPath = '执行cmd命令的路径'
// 子进程名称
let workerProcess


export default class Home extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      password: ''
    }
  }

  handleaccountChange(e) {
    this.setState({
      account: e.target.value
    })
  }

  handlePwdChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  runExec(ID, Account) {
    let cmdStr = 'ls'
    // let cmdStr = `BeatSaber ${ID} ${Account}`;
    // 执行命令行，如果命令不需要路径，或就是项目根目录，则不需要cwd参数：
    workerProcess = exec(cmdStr, {})
    // 不受child_process默认的缓冲区大小的使用方法，没参数也要写上{}：workerProcess = exec(cmdStr, {})

    // 打印正常的后台可执行程序输出
    workerProcess.stdout.on('data', function (data) {
      console.log('stdout: ' + data);
    });

    // 打印错误的后台可执行程序输出
    workerProcess.stderr.on('data', function (data) {
      console.log('stderr: ' + data);
    });

    // 退出之后的输出
    workerProcess.on('close', function (code) {
      console.log('out code：' + code);
    })
  }

  login() {
    if(this.state.account && this.state.password) {
      if(this.state.account === 'admin') {
        this.props.history.push('/admin')
        console.log(this.props);
      } else {
        this.runExec(1, 2);
      }
    } else {
      dialog.showErrorBox('登录失败', '请输入正确的账号和密码');
    }
  }

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <img className={styles.logo} src={Logo} alt="" />
        {/* <h2>Home</h2>
        <Link to={routes.COUNTER}>to Counter</Link> */}
        <div className={styles.loginForm}>
          <label htmlFor="Account">Account</label>
          <input id="Account" type="text" onChange={this.handleaccountChange.bind(this)} /><br/>
          <label htmlFor="Password">password</label>
          <input id="Password" type="password" onChange={this.handlePwdChange.bind(this)} />
        </div>

        <div className={styles.buttons}>
          <a href="#" className={styles['button-info']} onClick={this.login.bind(this)}>
            <p>
              Login
            </p>
          </a>
        </div>
      </div>

    );
  }
}
