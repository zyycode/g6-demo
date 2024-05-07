<script setup>
import { onMounted, ref } from 'vue';
import G6 from '@antv/g6';
import { Renderer as WebGLRenderer } from '@antv/g-webgl';
import { Plugin } from '@antv/g-plugin-3d';

import webImg from './assets/item_web.png';

// 创建 WebGL 渲染器
const webglRenderer = new WebGLRenderer();

// 注册 3D 插件
webglRenderer.registerPlugin(new Plugin());

const containerRef = ref(null);

const data = {
  nodes: [
    { id: '0', x: 100, y: 100 },
    { id: '1', x: 200, y: 100 },
    { id: '2', x: 100, y: 200 },
    { id: '3', x: 200, y: 200 }
  ],
  edges: [
    { source: '0', target: '1' },
    { source: '1', target: '3' },
    { source: '3', target: '2' },
    { source: '2', target: '0' },
    { source: '0', target: '3' },
    { source: '1', target: '2' }
  ]
};

G6.registerEdge('flow-line', {
  draw(cfg, group) {
    const startPoint = cfg.startPoint;
    console.log('startPoint: ', startPoint);
    const endPoint = cfg.endPoint;
    console.log('endPoint: ', endPoint);

    const { style } = cfg;
    const shape = group.addShape('path', {
      attrs: {
        stroke: style.stroke,
        endArrow: style.endArrow,
        path: [
          ['M', startPoint.x, startPoint.y],
          ['L', startPoint.x + 30, (startPoint.y + endPoint.y) / 2],
          ['L', endPoint.x - 30, (startPoint.y + endPoint.y) / 2],
          ['L', endPoint.x, endPoint.y]
        ]
      }
    });

    return shape;
  }
});

const defaultEdgeStyle = {
  stroke: '#91d5ff',
  endArrow: {
    path: 'M 0,0 L 12, 6 L 9,0 L 12, -6 Z',
    fill: '#91d5ff',
    d: -20
  }
};

const initGraph = () => {
  const width = 500;
  const height = 500;
  const graph = new G6.Graph({
    container: containerRef.value,
    width,
    height,
    fitView: true,
    defaultNode: {
      size: 30,
      type: 'rect',
      // type: 'image',
      // img: webImg,
      style: {
        // fill: '#5B8FF9',
        // lineWidth: 2,
        // shadowColor: '#aaa',
        // shadowBlur: 5,
        // shadowOffsetX: 3,
        // shadowOffsetY: 3,
      }
    },
    defaultEdge: {
      // type: 'flow-line',
      // style: defaultEdgeStyle
    }
    // 设置透视投影
    // renderer: webglRenderer,
    // 设置相机位置和视角
    // 这里的 camera 参数可以根据实际需要进行调整
    // camera: {
    //   position: [0, 0, 500], // 相机位置
    //   lookAt: [0, 0, 10], // 相机看向的位置
    //   up: [0, 1, 0] // 相机的上方向
    // }
  });

  graph.data(data);
  graph.render();
};

onMounted(() => {
  initGraph();
});
</script>

<template>
  <div id="container" ref="containerRef"></div>
</template>

<style>
#container {
  transform: rotate(-20deg) skew(20deg);
}
</style>
