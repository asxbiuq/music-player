<template>
  <div class="sidebar">
    <!-- sidebar-components-top -->
    <div local="top" class="logo-details">
      <i class='bx bx-cheese'></i>
      <span class="logo_name">CodingLab</span>
    </div>

    <!-- sidebar-components-middle -->
    <ul local="middle" class="nav-links">
      <li class="Dashboard">
        <a href="#">
          <i class='bx bxs-grid-alt'></i>
          <span class="link_name">Dashboard</span>
        </a>
      </li>

      <li class="Category li_arrow">
        <div class="icon-link">
          <a href="#">
            <i class='bx bx-collection'></i>
            <span class="link_name">Category</span>
          </a>
          <i class='bx bx-chevron-down arrow'></i>
        </div>
        <ul class="sub-menu">
          <li><a class="link_name" href="#">Category</a></li>
          <li><a href="#">HTML & CSS</a></li>
          <li><a href="#">JavaScript</a></li>
          <li><a href="#">Card Desgin</a></li>
        </ul>
      </li>

      <li class="Posts li_arrow">
        <div class="icon-link">
          <a href="#">
            <i class='bx bxs-book-bookmark'></i>
            <span class="link_name">Posts</span>
          </a>
          <i class='bx bx-chevron-down arrow'></i>
        </div>
        <ul class="sub-menu">
          <li><a class="link_name" href="#">Posts</a></li>
          <li><a href="#">HTML & CSS</a></li>
          <li><a href="#">JavaScript</a></li>
          <li><a href="#">Card Desgin</a></li>
        </ul>
      </li>

      <li class="Analytics">
        <a href="#">
          <i class='bx bxs-pie-chart-alt'></i>
          <span class="link_name">Analytics</span>
        </a>
        <ul class="sub-menu blank">
          <li><a class="link_name" href="#">Analytics</a></li>
        </ul>
      </li>
    </ul>

    <!-- sidebar-components-bottom -->
    <div local="bottom" class="profile-details">
      <div class="profile-content">
        <img src="profile.jpg" alt="profile">
      </div>
      <div class="name-job">
        <div class="profile_name">Prem Shahi</div>
        <div class="job">Web Desginer</div>
      </div>
      <i class='bx bx-log-out'></i>
    </div>
  </div>
  <!-- homeSection 与 sidebar 相独立-->
  <div class="home-section">
    <div class="home-content">
      <i class='bx bx-menu switch-btn' @click="handleSwitchBtn"></i>
      <span class="text">Drop Down Sidebar</span>
    </div>
  </div>
</template>

<script setup>
let li_arrows = document.querySelectorAll('.li_arrow')

li_arrows.forEach((item) => {
  item.addEventListener("click", (event) => {
    //为带有箭头图标的按钮挂上监听事件,通过给按钮的类名添加"change"来为按钮打开与关闭的样式做出划分
    item.classList.toggle("change")
    console.log(item)
  })
})

let sidebar = document.querySelector('.sidebar');
// let switchBtn = document.querySelector('.switch-btn');
//为sidebar里的部件挂上监听事件,通过给sidebar的类名添加"close"来为sidebar打开与关闭的样式做出划分
// switchBtn.addEventListener("click", () => {
//   sidebar.classList.toggle("close")
// })
const handleSwitchBtn = () => {
  sidebar.classList.toggle("close")
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'poppins', sans-serif;
  position: relative;
  
}

/* 为所有的元素添加过渡动画 */
*>* {
  transition: all 0.4s ease;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;

  height: 100%;
  width: 260px;

  background: #11101d;
  z-index: 100;

  .logo-details {
    height: 60px;
    width: 100%;

    display: flex;

    i {
      font-size: 30px;
      color: #fff;
      /* 产生一个空间,并使图案居于中间 */
      height: 50px;
      min-width: 78px;
      /* 临时添加背景颜色 */
      /* background-color: brown; */
      text-align: center;
      line-height: 50px;
    }

    .logo_name {
      font-size: 22px;
      color: #fff;
      font-weight: 600;

      line-height: 50px;
    }
  }

  .nav-links {
    height: 100%;
    padding: 30px 0 150px 0;

    /* 隐藏滑动条 */
    &::-webkit-scrollbar {
      display: none;
    }

    li {
      position: relative;

      list-style: none;

      .icon-link {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      i {
        height: 50px;
        min-width: 78px;
        text-align: center;
        line-height: 50px;
        color: aliceblue;
        font-size: 20px;
        cursor: pointer;
      }

      a {
        display: flex;
        align-items: center;
        text-decoration: none;

        .link_name {
          font-size: 18px;
          font-weight: 400;
          color: #fff;
        }
      }

      .sub-menu {
        padding: 6px 6px 14px 80px;
        margin-top: -10px;
        background: #1d1b31;
        display: none;
        // 覆盖掉全局的过渡动画
        transition: all 0s;

        a {
          color: #fff;
          font-size: 15px;
          padding: 5px 0;
          white-space: nowrap;
          opacity: 0.6;

          &:hover {
            opacity: 1;
          }
        }

        .link_name {
          display: none;
        }
      }

      .sub-menu.blank {
        pointer-events: auto;
        padding: 3px 20px 6px 16px;
      }

      &:hover .sub-menu.blank {
        top: 50%;
        transform: translateY(-50%);
      }
    }

    li:hover {
      background-color: #1d1b31;
    }

    .li_arrow.change {
      i.arrow {
        transform: rotate(-180deg);
      }

      .sub-menu {
        display: block;
      }
    }
  }

  .profile-details {
    width: 260px;

    position: fixed;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: space-around;

    background-color: #1d1b31;

    padding: 6px 0;

    opacity: 1;

    .job {
      font-size: 12px;
      color: #fff;
      font-weight: 500;

      white-space: nowrap;
    }

    i {
      color: #fff;
      font-size: 25px;

      position: relative;
      right: 10px;
    }

    .profile_name {
      color: #fff;
      font-weight: 500;
      font-size: 18px;

      white-space: nowrap;
    }

    img {
      height: 52px;
      width: 52px;

      border-radius: 16px;

      object-fit: cover;

      margin: 0 14px 0 12px;
      padding: 10px;

      background: #1d1b31;
    }
  }
}

.home-section {


  background-color: #E4E9F7;

  height: 100vh;
  width: calc(100% - 260px);

  .home-content {
    height: 60px;

    display: flex;
    align-items: center;

    .bx-menu {
      color: #11101d;
      font-size: 35px;

      margin: 0 15px;
    }

    .text {
      font-size: 26px;
      font-weight: 600
    }
  }
}



/* .sidebar.close */
.sidebar.close {
  width: 78px;

  .logo-details {
    .logo_name {
      opacity: 0;
      pointer-events: none;
    }
  }

  .nav-links {
    i.arrow {
      display: none;
    }

    li {
      .icon-link {
        display: block;
      }

      a .link_name {
        opacity: 0;
        pointer-events: none;
      }

      &:hover .sub-menu {
        display: block;
        top: 0;

        opacity: 1;
        pointer-events: auto;
      }

      .sub-menu {
        position: absolute;
        left: 100%;
        top: -10px;

        margin-top: 0;
        padding: 10px 20px;

        border-radius: 0 6px 6px 0;

        opacity: 0;
        pointer-events: none;

        .link_name {
          font-size: 18px;

          opacity: 1;
          display: block;
        }

      }
    }
  }

  .profile-details {
    width: 78px;

    display: flex;

    transition: all 0.4s ease;

    .profile_name,
    .job,
    i {
      width: 0;
      overflow: hidden;
    }
  }

  ~.home-section {
    left: 78px;
    width: calc(100% - 78px);
  }
}
</style>