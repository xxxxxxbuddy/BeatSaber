import fetch from './fetch'
import mongoose from 'mongoose'
import { info } from 'electron-log';
const dialog = require('electron').remote.dialog;
import http from 'axios';

// function connectDB(account, password) {

//   console.log(mongoose.connection);
//   if(!mongoose.connection._readyState) {
//     mongoose.connect("mongodb://BeatSaber:BeatSaber@134.175.43.194/admin",
//     {
//       useNewUrlParser: true,
//       autoReconnect: true,
//       poolSize: 10,
//       connectTimeoutMS: 5000,
//       reconnectTries: Number.MAX_VALUE,
//       reconnectInterval: 1000
//     }, function(error) {
//         if(error) {
//           console.log(`连接失败${error}`);
//           dialog.showErrorBox('网络连接失败', '请检查您的网络连接后重试');
//           return;
//         }else{
//           console.log('连接成功');
//         }
//       });
//   }

//   let schema, User;
//   try {
//     User = mongoose.model('users');
//   } catch (e){
//     schema = new mongoose.Schema({ account: String, password: String, status: String}, {timestamps: true});
//     User = mongoose.model('users', schema);
//   }

//   validate(User, account, password);


// }

// function validate(model, account, password) {
//   try {
//     model.findOne({account: account, password: password}, (err, doc) => {
//       if(err) {
//         console.log(err);
//         dialog.showErrorBox('登录失败', '输入错误');
//       } else if (doc) {
//         return true;
//         console.log(doc);
//         dialog.showMessageBox({
//           icon: null,
//           title: '登录成功',
//           message: '登录成功'
//         })
//       } else {
//         dialog.showErrorBox('登录失败', '请检查您的账号和密码');
//       }
//       mongoose.disconnect();
//     })
//   }catch(err) {
//     console.log(err);
//     mongoose.disconnect();
//   }

//   }

// 登录校验
export function Login(account: String, password: String) {
    return connectDB(account, password);
}

