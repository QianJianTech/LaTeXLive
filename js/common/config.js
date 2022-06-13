/**
 * @Copyright Copyright © 2021
 * @Createdon 2022-5-26
 * @Author Panda_YueTao
 * @Version 1.6.4
 * @Title 妈叔出品-LaTeX公式编辑器配置
 */

const Environment = "release";

const Config = {
  development: {
    Version: "开发版" + new Date().getTime(),
    MainJS: {
      latex: "/publish/latex.bundle.min.js",
      readme: "/publish/readme.bundle.min.js",
      update: "/publish/update.bundle.min.js",
      messageboard: "/publish/messageboard.bundle.min.js",
      login: "/publish/login.bundle.min.js",
      personal: "/publish/personal.bundle.min.js",
    },
    Boot_OSS: "..",
    WebAPI: {
      Root: "api服务器地址",
      Controller: {
        GetLaTexFromMathPix: "Mathpix/GetLaTexFromMathPix",
        LoginByMyToken: "Client/LoginByMyToken",
        LoginByAccount: "Client/LoginByAccount",
        RegByAccount: "Client/RegByAccount",
        UpdateUser: "Client/UpdateUser",
        DeleteUser: "Client/DeleteUser",
        LoginByWX: "Client/LoginByWX",
        WXBind: "Client/WXBind",
        LoginByMessage: "Client/LoginByMessage",
        SendMessageCode_Identity: "Client/SendMessageCode_Identity",
        SendMessageCode_Login: "Client/SendMessageCode_Login",
        GetRemainTime: "Client/GetRemainTime",
      },
    },
    Hostname: "本机服务器ip",
    WXLogin: {
      AppID: "微信id",
      RedirectURL: "完整网址",
    },
  },

  debug: {
    Version: "生产环境模拟版" + new Date().getTime(),
    MainJS: {
      latex: "/publish/latex.bundle.min.js",
      readme: "/publish/readme.bundle.min.js",
      update: "/publish/update.bundle.min.js",
      messageboard: "/publish/messageboard.bundle.min.js",
      login: "/publish/login.bundle.min.js",
      personal: "/publish/personal.bundle.min.js",
    },
    Boot_OSS: "对象存储地址",
    WebAPI: {
      Root: "api服务器地址",
      Controller: {
        GetLaTexFromMathPix: "Mathpix/GetLaTexFromMathPix",
        LoginByMyToken: "Client/LoginByMyToken",
        LoginByAccount: "Client/LoginByAccount",
        RegByAccount: "Client/RegByAccount",
        UpdateUser: "Client/UpdateUser",
        DeleteUser: "Client/DeleteUser",
        LoginByWX: "Client/LoginByWX",
        WXBind: "Client/WXBind",
        LoginByMessage: "Client/LoginByMessage",
        SendMessageCode_Identity: "Client/SendMessageCode_Identity",
        SendMessageCode_Login: "Client/SendMessageCode_Login",
        GetRemainTime: "Client/GetRemainTime",
      },
    },
    Hostname: "测试服务器ip+端口号",
    WXLogin: {
      AppID: "微信id",
      RedirectURL: "完整网址",
    },
  },
  
  release: {
    Version: "1.6.5",
    MainJS: {
      latex: "/publish/latex.bundle.min.js",
      readme: "/publish/readme.bundle.min.js",
      update: "/publish/update.bundle.min.js",
      messageboard: "/publish/messageboard.bundle.min.js",
      login: "/publish/login.bundle.min.js",
      personal: "/publish/personal.bundle.min.js",
    },
    Boot_OSS: "对象存储地址",
    WebAPI: {
      Root: "api服务器地址",
      Controller: {
        GetLaTexFromMathPix: "Mathpix/GetLaTexFromMathPix",
        LoginByMyToken: "Client/LoginByMyToken",
        LoginByAccount: "Client/LoginByAccount",
        RegByAccount: "Client/RegByAccount",
        UpdateUser: "Client/UpdateUser",
        DeleteUser: "Client/DeleteUser",
        LoginByWX: "Client/LoginByWX",
        WXBind: "Client/WXBind",
        LoginByMessage: "Client/LoginByMessage",
        SendMessageCode_Identity: "Client/SendMessageCode_Identity",
        SendMessageCode_Login: "Client/SendMessageCode_Login",
        GetRemainTime: "Client/GetRemainTime",
      },
    },
    Hostname: "完整网址",
    WXLogin: {
      AppID: "微信id",
      RedirectURL: "完整网址",
    },
  },
};
