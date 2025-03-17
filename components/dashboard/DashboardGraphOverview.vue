<script setup lang="ts">
import { reactive, onMounted, ref } from "vue"
import * as vNG from "v-network-graph"
import { useADPwnModuleApi } from '~/composable/useADPwnModuleApi';

const { getModuleInheritanceGraph } = useADPwnModuleApi()

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

// State for the graph
const nodes = ref<Record<string, Node>>({})
const edges = ref<Record<string, Edge>>({})
const layouts = ref<{ nodes: Record<string, { x: number, y: number }> }>({ nodes: {} })
const loading = ref(true)
const error = ref<string | null>(null)

// Function to convert ADPwnInheritanceGraph to v-network-graph format
const convertToGraphFormat = (graph: ADPwnInheritanceGraph) => {
  const graphNodes: Record<string, Node> = {}
  const graphEdges: Record<string, Edge> = {}
  const nodeLayouts: Record<string, { x: number, y: number }> = {}
  
  // Map node colors based on module type
  const getNodeColor = (moduleType: string) => {
    switch(moduleType) {
      case 'ATTACK': return '#ff5252'
      case 'RECON': return '#4caf50'
      case 'EXPLOIT': return '#ff9800'
      case 'POST_EXPLOIT': return '#2196f3'
      default: return '#9c27b0'
    }
  }

  // Create nodes
  graph.nodes.forEach((module, index) => {
    const nodeId = module.key
    graphNodes[nodeId] = {
      name: module.name,
      size: 20,
      color: getNodeColor(module.module_type),
      label: true
    }
    
    // Simple layout algorithm - place nodes in a grid
    const row = Math.floor(index / 5)
    const col = index % 5
    nodeLayouts[nodeId] = { 
      x: col * 160, 
      y: row * 120 
    }
  })
  
  // Create edges
  graph.edges.forEach((edge, index) => {
    const edgeId = `edge${index}`
    graphEdges[edgeId] = {
      source: edge.previous_module,
      target: edge.next_module,
      width: 2,
      color: '#ffffff',
      dashed: false
    }
  })
  
  return {
    nodes: graphNodes,
    edges: graphEdges,
    layouts: {
      nodes: nodeLayouts
    }
  }
}

// Event handlers
const eventHandlers: vNG.EventHandlers = {
  "node:click": ({ node }) => {
    // Display module details
    const moduleKey = node as string
    const module = graphData.value?.nodes.find(n => n.key === moduleKey)
    if (module) {
      alert(`Module: ${module.name}\nDescription: ${module.description}\nAuthor: ${module.author}`)
    }
  },
}

// Reactive configurations
const configs = reactive(
  vNG.defineConfigs<Node, Edge>({
    node: {
      normal: {
        type: "circle",
        radius: node => node.size,
        color: node => node.color,
      },
      hover: {
        radius: node => node.size + 5,
        color: node => node.color,
      },
      selectable: true,
      label: {
        visible: node => !!node.label,
        color: "#ffffff",
        fontSize: 12,
        fontFamily: "Arial, sans-serif",
      },
      focusring: {
        color: "#ffffff",
      },
    },
    edge: {
      normal: {
        width: edge => edge.width,
        color: edge => edge.color,
        dasharray: edge => (edge.dashed ? "4" : "0"),
      },
      hover: {
        width: edge => edge.width + 1,
      },
    },
  })
);

// Store the raw graph data
const graphData = ref<ADPwnInheritanceGraph | null>(null)

// Load data on component mount
onMounted(async () => {
  try {
    loading.value = true
    const data = await getModuleInheritanceGraph()
    graphData.value = data
    
    // Convert to graph format
    const formattedGraph = convertToGraphFormat(data)
    nodes.value = formattedGraph.nodes
    edges.value = formattedGraph.edges
    layouts.value = formattedGraph.layouts
    
    loading.value = false
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message
    } else {
      error.value = 'An unknown error occurred'
    }
    loading.value = false
  }
})
</script>

<template>
  <div class="graph-container">
    <div v-if="loading" class="loading">Loading module inheritance graph...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <v-network-graph
      v-else
      :nodes="nodes"
      :edges="edges"
      :layouts="layouts"
      :configs="configs"
      :event-handlers="eventHandlers"
    />
  </div>
</template>

<style scoped>
.graph-container {
  width: 100%;
  height: 600px;
  background-color: #1e1e1e;
  position: relative;
}

.loading, .error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  font-size: 18px;
}

.error {
  color: #ff5252;
}
</style>