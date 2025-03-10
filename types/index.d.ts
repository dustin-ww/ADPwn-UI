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
  uid: string
  attack_id?: string
  description: string
  metric?: string
  name: string
  version: string
  author: string
}