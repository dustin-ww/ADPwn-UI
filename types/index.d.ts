declare interface Project {
    uid: string
    name: string
    type?: string
    has_target?: Target[]  
    has_domain?: Domain[] 
    created_at?: string
  }

declare interface Target {
  }
  
declare interface Domain {
  }