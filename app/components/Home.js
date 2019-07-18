// @flow
import React from 'react';
import { Spinner } from 'react-bootstrap';
import { withRouter, Link } from 'react-router-dom';
import fs from 'fs';
import styles from './Home.css';
import { Login, GetLoginCount, GetScoresByPlayerID } from '../api';
import { BrowserWindow } from 'electron';
const dialog = require('electron').remote.dialog;
const Logo = require('../../resources/icons/BSLogo.png');
const exec = require('child_process').exec;
const { shell } = require('electron');
const window = require('electron').remote.getCurrentWindow();
const storage = require('electron-json-storage');

// 子进程名称
let workerProcess


class Home extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      password: '',
      loading: true
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

  runExec(Account, ID) {
    // let cmdStr = `BeatSaber ${ID} ${Account}`;
    // 执行命令行，如果命令不需要路径，或就是项目根目录，则不需要cwd参数：
    workerProcess = exec(`start VR.exe`, (error, stdout, stderr) => {
      if(error) {
        dialog.showErrorBox('ERROR', error);
      }
      dialog.showMessageBox(new BrowserWindow(), {message: stdout});
    });
    // 不受child_process默认的缓冲区大小的使用方法，没参数也要写上{}：workerProcess = exec(cmdStr, {})

    // 打印正常的后台可执行程序输出
    workerProcess.stdout.on('data', function (data) {
      console.log('stdout: ' + data);
    });

    // 打印错误的后台可执行程序输出
    workerProcess.stderr.on('data', function (data) {
      console.log('stderr: ' + decodeURI(data));
      dialog.showErrorBox('Error', data);
    });

    // 退出之后的输出
    workerProcess.on('close', function (code) {
      console.log('out code：' + code);
    })
  }

  login() {
    if(this.state.account && this.state.password) {
      this.setState({
        loading: true
      })
      Login(this.state.account, this.state.password).then(
        res => {
          if(res.data.code === 1) {
            if(this.state.account === 'admin') {
              this.getChartData();
            } else {
              fs.writeFileSync('config.txt', `{Account:${this.state.account},ID:${res.data.result[0]}}`);
              shell.openItem("VR.exe");
              window.close();
            }
          } else {
            dialog.showErrorBox('登录失败', res.data.errMsg);
            console.log(res.data.errMsg);
          }
          this.setState({
            loading: false
          })
        },
        err => {
          this.setState({
            loading: false
          })
          dialog.showErrorBox('登录失败', err.message || '');
        });
      } else {
        dialog.showMessageBox(null, {
          title: '登录失败',
          message: '请输入正确的账号和密码！'
        })
      }
    } 

    getChartData() {
      let chartData = {data:[],labels:[]};
      GetLoginCount().then(
        res => {
          if (res.data.code === 1) {
            res.data.result.forEach(item => {
              chartData.labels.push(item.TheDate.slice(0, 10));
              chartData.data.push(item.LoginCount);
            });
            this.setState({loading: false});
            storage.set('chartData', chartData);
            this.props.history.push({
              pathname: '/admin'
            });
          } else {
            this.setState({loading: false});
            dialog.showErrorBox('网络错误', res.data.errMsg)
          }
        }
      ).catch(err => {
        this.setState({loading: false});
        dialog.showErrorBox('网络错误', err.message);
      })
    }

    componentDidMount() {
      this.setState({
        loading: false
      })
    }

   

  render() {
    let content = null;
    if(this.state.loading) {
      content = (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    } else {
      content = (
        <div>
          <div className={styles.loginForm}>
            <label htmlFor="Account">Account</label>
            <input id="Account" type="text" onChange={this.handleaccountChange.bind(this)} /><br/>
            <label htmlFor="Password">Password</label>
            <input id="Password" type="password" onChange={this.handlePwdChange.bind(this)} />
          </div>

          <div className={styles.buttons}>
            <div className={styles['button-info']} onClick={this.login.bind(this)}>
              <p>
                Login
              </p>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className={styles.container} data-tid="container"> 
        <img className={styles.logo} src={Logo} alt="" />
        {content}
      </div>

    );
  }
}

export default withRouter(Home);