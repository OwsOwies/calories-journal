/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare module 'react-native-extended-stylesheet' {
	function value(expr: any, prop?: string): any;
	function create(obj: Object): any;
	function build(rawGlobalVars: any): void;
}

declare module 'art' {
  function Path(svg: string): any;
  function Tween(path1: string, path2: string): any;
}