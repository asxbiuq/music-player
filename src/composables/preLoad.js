/**
 * 预加载
 * @param {Array} dataList  预加载数据
 * @param {Array} attrArray 预加载属性，可选
 */
export function preLoad(dataList, attrList) {
  //若有指定对象属性
  let imgList = [];
  if (attrList) {
    dataList.forEach(element => {
      attrList.forEach(attr => {
        if (element[attr]) {
          const img = new Image();
          img.src = element[attr];
          imgList.push(img);

        }
      })
    });
  } else {
    dataList.forEach(element => {
      const img = new Image();
      img.src = element;
      imgList.push(img);
    });
  }

  return imgList;
}

