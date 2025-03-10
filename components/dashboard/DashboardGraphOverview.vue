<script setup lang="ts">
import { reactive } from "vue"
import * as vNG from "v-network-graph"

interface Node extends vNG.Node {
  size: number
  color: string
  label?: boolean
}

interface Edge extends vNG.Edge {
  width: number
  color: string
  dashed?: boolean
}

const nodes: Record<string, Node> = {
  node1: { name: "Node 1", size: 16, color: "white" },
  node2: { name: "Node 2", size: 32, color: "orange", label: true },
  node3: { name: "Node 3", size: 24, color: "red", label: true },
  node4: { name: "Node 4", size: 16, color: "gray" },
  node5: { name: "Node 5", size: 32, color: "hotpink", label: true },
}

const edges: Record<string, Edge> = {
  edge1: { source: "node1", target: "node2", width: 1, color: "black" },
  edge2: { source: "node2", target: "node3", width: 5, color: "gray", dashed: true },
  edge3: { source: "node3", target: "node4", width: 1, color: "black" },
  edge4: { source: "node3", target: "node4", width: 3, color: "skyblue" },
  edge5: { source: "node4", target: "node5", width: 3, color: "hotpink" },
  edge6: { source: "node4", target: "node5", width: 1, color: "black" },
  edge7: { source: "node4", target: "node5", width: 3, color: "skyblue" },
}

const eventHandlers: vNG.EventHandlers = {
  "node:click": ({ node }) => {
    // toggle
    console.log("clicked")
  },
}

const layouts = {
  nodes: {
    node1: { x: 0, y: 0 },
    node2: { x: 80, y: 80 },
    node3: { x: 160, y: 0 },
    node4: { x: 240, y: 80 },
    node5: { x: 320, y: 0 },
  },
}

// In Node and Edge configuration, instead of concrete values,
// you can specify functions that return a configuration value
// with each node or edge as an argument.
// In addition, custom types for Node and Edge can be explicitly
// specified in `defineConfigs` to specify the argument types
// for callback functions.
const configs = reactive(
  vNG.defineConfigs<Node, Edge>({
    node: {
      normal: {
        type: "circle",
        radius: node => node.size,
        color: node => node.color,
      },
      hover: {
        radius: node => node.size + 2,
        color: node => node.color,
      },
      selectable: true,
      label: {
        visible: node => !!node.label,
        color: "#ffffff", // Setze die Textfarbe auf Weiß
      },
      focusring: {
        color: "darkgray",
      },
    },
    edge: {
      normal: {
        width: edge => edge.width,
        color: "#ffffff",
        dasharray: edge => (edge.dashed ? "4" : "0"),
      },
    },
  })
);
</script>

<template>
  <v-network-graph
    :nodes="nodes"
    :edges="edges"
    :layouts="layouts"
    :configs="configs"
    :event-handlers="eventHandlers"
  />
</template>