import "./App.scss";
import avatar from "./images/bozai.png";
import { useState } from "react";
import orderBy from "lodash/orderBy";

// 导航 Tab 数组
const tabs = [
  { type: "hot", text: "最热" },
  { type: "time", text: "最新" },
];

// 评论列表数据
const defaultList = [
  {
    // 评论id
    rpid: 3,
    // 用户信息
    user: {
      uid: "13258165",
      avatar:
        "https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/reactbase/comment/zhoujielun.jpeg",
      uname: "周杰伦",
    },
    // 评论内容
    content: "哎哟，不错哦",
    // 评论时间
    ctime: "10-18 08:15",
    // 喜欢数量
    like: 98,
    // 0：未表态 1: 喜欢 2: 不喜欢
    action: 0,
  },
  {
    rpid: 2,
    user: {
      uid: "36080105",
      avatar:
        "https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/reactbase/comment/xusong.jpeg",
      uname: "许嵩",
    },
    content: "我寻你千百度 日出到迟暮",
    ctime: "11-13 11:29",
    like: 88,
    action: 2,
  },
  {
    rpid: 1,
    user: {
      uid: "30009257",
      avatar,
      uname: "小华",
    },
    content: "来科技公司搬砖",
    ctime: "10-19 09:00",
    like: 66,
    action: 1,
  },
];

// 当前登录用户信息
const user = {
  // 用户id
  uid: "30009257",
  // 用户头像
  avatar,
  // 用户昵称
  uname: "小华",
};

const App = () => {
  const [list, setList] = useState(defaultList);

  //切换状态
  const [activeTab, setActiveTab] = useState("hot");
  //删除评论
  const onDelete = (rpid) => {
    setList(list.filter((item) => item.rpid !== rpid));
  };

  //点击喜欢
  const onLike = (rpid) => {
    console.log(rpid);
    setList(
      list.map((item) => {
        if (item.rpid === rpid) {
          return {
            ...item,
            //修改action的值，用来改变样式
            action: item.action === 1 ? 0 : 1,
            like: item.action === 1 ? item.like - 1 : item.like + 1,
          };
        }
        return item;
      })
    );
  };

  //点击不喜欢
  const onDislike = (rpid) => {
    console.log(rpid);
    setList(
      list.map((item) => {
        if (item.rpid === rpid) {
          return {
            ...item,
            action: item.action === 2 ? 0 : 2,
            like: item.action === 1 ? item.like - 1 : item.like,
          };
        }
        return item;
      })
    );
  };

  //切换评论排序
  const onToggle = (type) => {
    console.log(type);

    setActiveTab(type);
    let newList;
    newList = list;
    //排序
    if (type === "time") {
      newList = orderBy(list, "ctime", "dsc");
    } else {
      newList = orderBy(list, "like", "dsc");
    }
    setList(newList);
  };

  return (
    <div className="app">
      {/* 导航 Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">评论</span>
            {/* 评论数量 */}
            <span className="total-reply">{list.length}</span>
          </li>
          <li className="nav-sort ">
            {/* 高亮类名： active */}
            {tabs.map((item) => {
              return (
                <div
                  key={item.type}
                  className={
                    item.type === activeTab ? "nav-item active" : "nav-item"
                  }
                  onClick={() => onToggle(item.type)}
                >
                  {item.text}
                </div>
              );
            })}
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* 发表评论 */}
        <div className="box-normal">
          {/* 当前用户头像 */}
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="用户头像" />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* 评论框 */}
            <textarea
              className="reply-box-textarea"
              placeholder="发一条友善的评论"
            />
            {/* 发布按钮 */}
            <div className="reply-box-send">
              <div className="send-text">发布</div>
            </div>
          </div>
        </div>

        {/* 评论列表 */}
        <div className="reply-list">
          {/* 评论项 */}
          {list.map((item) => {
            return (
              <div key={item.rpid} className="reply-item">
                {/* 头像 */}
                <div className="root-reply-avatar">
                  <div className="bili-avatar">
                    <img
                      className="bili-avatar-img"
                      src={item.user.avatar}
                      alt=""
                    />
                  </div>
                </div>

                <div className="content-wrap">
                  {/* 用户名 */}
                  <div className="user-info">
                    <div className="user-name">{item.user.uname}</div>
                  </div>
                  {/* 评论内容 */}
                  <div className="root-reply">
                    <span className="reply-content">{item.content}~</span>
                    <div className="reply-info">
                      {/* 评论时间 */}
                      <span className="reply-time">{item.ctime}</span>
                      {/* 喜欢 */}
                      <span className="reply-like">
                        {/* 选中类名： liked */}
                        <i
                          className={
                            item.action === 1
                              ? "icon like-icon liked"
                              : "icon like-icon"
                          }
                          onClick={() => onLike(item.rpid)}
                        />
                        <span>{item.like}</span>
                      </span>
                      {/* 不喜欢 */}
                      <span className="reply-dislike">
                        {/* 选中类名： disliked */}
                        <i
                          className={
                            item.action === 2
                              ? "icon dislike-icon disliked"
                              : "icon dislike-icon"
                          }
                          onClick={() => onDislike(item.rpid)}
                        />
                      </span>
                      {item.user.uid === user.uid && (
                        <span
                          className="delete-btn"
                          onClick={() => onDelete(item.rpid)}
                        >
                          删除
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {list.length === 0 && <div className="reply-none">暂无评论</div>}
        {""}
      </div>
    </div>
  );
};
export default App;
