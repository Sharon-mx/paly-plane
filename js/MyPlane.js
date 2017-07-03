


	/**
	 * 我的飞机
	 * 
	 */
	var myPlane = {
		//属性：ele
		ele:null,
		
		//发射子弹的时间间隔
		fireInteveral:60,
		
		//初始化方法
		init:function(){
			this.ele = document.createElement("div");
			this.ele.className = "myplane";
			document.body.appendChild(this.ele);
			
			//位置
			var left = gameEngine.ele.offsetLeft + gameEngine.ele.offsetWidth/2 - this.ele.offsetWidth/2;
			
			this.ele.style.left = left + "px";
			this.ele.style.bottom = 0;
			
			return this;
		},
		
		//自动发射子弹功能
		autoFire:function(){
			setInterval(function(){
				//创建子弹
				var bullet = new Bullet();
				bullet.init().move();
				
			},this.fireInteveral);
			
		}
	}
