export default { // 创建loading组件
  create(){ // 显示loading组件
    const body = document.querySelector('body')
    const Mask = document.createElement('div')
    Mask.setAttribute('id', 'loading')
    Mask.setAttribute('data-https', 1)
    const load = document.createElement('div')
    load.setAttribute('class', 'load-effect')
    for(let i = 0;i < 12;i ++){
      const Span = document.createElement('span')
      Span.style.transform = 'translate(0, -50%) rotate(' + i*30 + 'deg)'
      Span.style['-webkit-animation-delay'] = 0.13*(i + 2) + 's'
      load.appendChild(Span)
    }
    Mask.appendChild(load)
    body.appendChild(Mask)
  },
  show(){
    const Loading = document.querySelector('#loading')
    if(Loading){
      let httpsNumber = Loading.dataset.https*1
      Loading.style.display = 'block'
      Loading.setAttribute('data-https', httpsNumber + 1)
    }else{
      this.create()
    }
  },
  hide(){
    const Loading = document.querySelector('#loading')
    let httpsNumber = Loading.dataset.https*1
    if(httpsNumber <= 1){
      Loading.style.display = 'none'
    }
    Loading.setAttribute('data-https', httpsNumber - 1)
  }
}