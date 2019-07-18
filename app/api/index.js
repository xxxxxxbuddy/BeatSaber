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

// 获取玩家账户信息
export function GetPlayers() {
    return fetch({
        url: '/Statistics.svc/GetPlayers',
        method: 'get'
    })
}

// 根据MusicID获取这首歌下的玩家成绩
export function GetRankByMusicID(musicID) {
    return fetch({
        url: '/Statistics.svc/MusicHighestScores/' + musicID,
        method: 'GET'
    });
    // axios({
    //     url: '/Statistics.svc/MusicHighestScores',
    //     method: 'POST',
    //     data: {
    //         MusicID: musicID
    //     },
    //     Headers: {
    //         'Content-Type': 'application/json'
    //     }
    // })
    
}

// 获取指定玩家在所有关卡中的分数
export function GetScoresByPlayerID(playerID) {
    return fetch({
        url: '/Statistics.svc/GetHighestScore/' + playerID,
        method: 'get'
    })
}

// 歌曲热度统计
export function GetPopularity() {
    return fetch({
        url: '/Statistics.svc/GetPopularity',
        method: 'GET'
    })
}