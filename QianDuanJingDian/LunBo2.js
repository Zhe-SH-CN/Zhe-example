window.onload = () => {
  let img = document.querySelectorAll(".img");
  let left = document.querySelector(".left");
  let right = document.querySelector(".right");
  let buttons = document.querySelectorAll("p");

  //设置一个数组，来存id
  idArr = ["first", "second", "right", "left", "left", "left", "last"];

  //设置一个变量来当图片的索引
  let index = 0;

  initialize();

  //设置一个定时器，让图片轮播
  let timer = setInterval(next, 3000);

  //给箭头绑定点击事件
  left.addEventListener("click", prev);
  //当鼠标放在箭头上的时候，计时器停止
  left.addEventListener("mouseover", () => {
    clearInterval(timer);
    timer = null;
  });
  //当鼠标离开箭头的时候,让定时器重新开始
  left.addEventListener("mouseout", () => {
    timer = setInterval(next, 3000);
  });

  right.addEventListener("click", next);
  right.addEventListener("mouseover", () => {
    clearInterval(timer);
    timer = null;
  });
  right.addEventListener("mouseout", () => {
    timer = setInterval(next, 3000);
  });

  //为小按钮添加点击事件
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("mousedown", () => {
      clearInterval(timer);
      timer = null;
      //需要判断用户点击的小方块与当前图片的索引之差
      // 如果大于0，说明用户需要更换的是后面的图片
      // 反之，是前面的图片
      if (index > i) {
        let x = index - i;
        while (x--) {
          prev();
        }
      } else if (index < i) {
        let x = i - index;
        while (x--) {
          next();
        }
      }
      timer = setInterval(next, 3000);
    });
  }

  //创建一个函数来切换图片
  function prev() {
    //切换上一张就是把数组的最后一个元素变成第一个元素
    idArr.push(idArr.shift());
    initialize();
    if (index === 0) {
      index = buttons.length - 1;
    } else {
      index--;
    }
    clearColor();
  }
  function next() {
    //跟上面反过来
    idArr.unshift(idArr.pop());
    initialize();
    if (index === buttons.length - 1) {
      index = 0;
    } else {
      index++;
    }
    clearColor();
  }

  //创建一个函数来让小方块跟着图片移动
  function clearColor() {
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].style.backgroundColor = "silver";
    }
    //让当前索引变色
    buttons[index].style.backgroundColor = "rgb(20, 134, 187)";
  }

  //创建一个函数来初始化图片
  function initialize() {
    for (let i = 0; i < img.length; i++) {
      img[i].id = idArr[i];
    }
  }
};
