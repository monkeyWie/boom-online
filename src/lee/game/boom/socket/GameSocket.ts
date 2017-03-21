module boom {
	export class GameSocket {
		private static host:string = "192.168.18.41";
		private static port:number = 8080;
		private static socket:egret.WebSocket;

		private constructor() {
			
		}

		public static init(onConnect:Function,onRecive:Function){
			if(this.socket==null){
				this.socket = new egret.WebSocket();
				this.socket.connect(this.host,this.port);
				this.socket.addEventListener(egret.Event.CONNECT,onConnect,this);
				this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA,()=>{
					onRecive(this.socket.readUTF());
				},this);
			}
		}

		public static send(msg:string){
			this.socket.writeUTF(msg);
		}
	}
}