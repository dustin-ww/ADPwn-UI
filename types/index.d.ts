declare interface Project {
    uid: string
    name: string
    created_at? : string,
    modified_at? : string,
    description? : string,
    type?: string
    has_target?: Target[]  
    has_domain?: Domain[] 
    created_at?: string
  }

declare interface Target {
    uid: string
    name: string
    ip_range: string
  }
  
declare interface Domain {
  }


  declare interface ADPwnModule {
    uid?: string;
    attack_id: string;
    execution_metric: string;
    description: string;
    name: string;
    version: string;
    author: string;
    module_type: string;
    loot_path: string;
    key: string;
    is_attack?: boolean; 
  }
  
  declare interface ADPwnModuleInheritanceEdge {
    previous_module: string;
    next_module: string;
  }
  
  declare interface ADPwnInheritanceGraph {
    nodes: ADPwnModule[];
    edges: ADPwnModuleInheritanceEdge[];
  }