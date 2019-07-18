import fetch from './fetch'
import axios from 'axios';

// 登录校验
export function Login(account, password) {
    if(account === 'admin' && password === 'admin') {
        return Promise.resolve({data: {code: 1}});
    }
    return axios.post('http://www.hustimis.cn:8014/Log.svc/Login', {
        "Account": account,
        "Password": password
    })
}

// 登陆统计
export function GetLoginCount() {
    return fetch({
        url: '/Statistics.svc/GetLoginCount',
        method: 'get'
    })
}

// 根据MusicID获取这首歌下的玩家成绩
export function GetRankByMusicID(musicID) {
    return fetch({
        url: '/Statistics.svc/GetPlayerRecord',
        method: 'POST',
        data: {
            "MusicID": musicID
        }
    });
}

// 获取指定玩家在所有关卡中的分数
export function GetScoresByPlayerID(playerID) {
    return fetch({
        url: '/Statistics.svc/GetHighestScores',
        method: 'POST',
        data: {
            "PlayerID": playerID
        }
    })
}