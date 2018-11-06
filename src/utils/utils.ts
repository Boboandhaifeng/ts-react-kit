// 调用方式
// 参数一： src
// 参数二： 图片名称，可选
export const downloadImage = (src: string, name: string) => {
    const image = new Image();
    // 解决跨域 canvas 污染问题
    image.setAttribute('crossOrigin','anonymous');
    image.onload = function(){
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext('2d');
      context.drawImage(image,0,0,image.width,image.height);
      const url = canvas.toDataURL('image/png');
      // 生成一个 a 标签
      const a = document.createElement('a');
      // 创建一个点击事件
      const event = new MouseEvent('click');
      // 将 a 的 download 属性设置为我们想要下载的图片的名称，若 name 不存在则使用'图片'作为默认名称
      a.download = name || '图片';
      // 将生成的 URL 设置为 a.href 属性
      a.href = url;
      // 触发 a 的点击事件
      a.dispatchEvent(event);
    };
    image.src = src
}
