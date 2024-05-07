import img from './assets/vue.svg'
import webImg from './assets/item_web.png'


const data = {
  nodes: [
    { id: 'node1', x: 100, y: 100, shape: 'rect', label: 'Node 1' },
    { id: 'node2', x: 200, y: 100, shape: 'rect', label: 'Node 2' },
    { id: 'node3', x: 300, y: 100, shape: 'rect', label: 'Node 3' }
  ],
  // edges: [
  //   { source: 'node1', target: 'node2' },
  //   { source: 'node2', target: 'node3' },
  // ],

};

const treeData = {
  id: 'node1',
  img: webImg,
  type: 'image',
  label: 'Vue',
  labelCfg: {
    position: 'bottom',
    color: '#000'
  },
  // 裁剪图片配置
  clipCfg: {
    // show: true,
    // type: 'circle',
    // r: 0
  },
  style: {
    // fill: '#000'
  },
  // x: 150,
  // y: 150
  children: [
    {
      id: 'node2',
      label: 'Circle2',
      img: webImg,
    },
    {
      id: 'node3',
      label: 'Vue',
      img: webImg,
      type: 'image',
    },
    {
      id: 'node4',
      label: 'Vue',
      img: webImg,
      type: 'image',
    }
  ]
}


export {
  data,
  treeData
}

