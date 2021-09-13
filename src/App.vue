<template>
	<div class="sidebar">
		<div class="profile">
			<img src="avatar.jpg" class="avatar">
			<div class="userInfo">
				User42
				<br>
				<span class="description">online</span>
			</div>
			<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" class="icon_reverse" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
		</div>
		<hr>
		<div class="menu">
			<div style="margin-bottom: 13px">
				<span>MESSAGES</span> <br>
				<span class="description">history</span>
			</div>
			<div :class="item.id === getTarget ? 'linkActive' : 'link'" v-for="(item, i) in getSections" :key="i" @click="setTarget(item.id)">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon" stroke-linecap="round" stroke-linejoin="round"><path d="M21.5 12H16c-.7 2-2 3-4 3s-3.3-1-4-3H2.5"/><path d="M5.5 5.1L2 12v6c0 1.1.9 2 2 2h16a2 2 0 002-2v-6l-3.4-6.9A2 2 0 0016.8 4H7.2a2 2 0 00-1.8 1.1z"/></svg>
				{{ item.id }} ({{ item.messages.length }})
			</div>
		</div>
		<hr>
		<div class="menu">
			<input type="text" class="form_field" placeholder="Наименование секции" v-model="sectionName" style="margin-top: 10px">
			<input type="button" class="btnDefault" value="Добавить" style="margin-top: 15px" @click="sendSection">
		</div>
	</div>
	<div class="mainbar">
		<div class="spaceLeft"></div>
		<div class="centralBlock">
			<div class="header">
				<span class="higherText">Questions Messenger</span> <br>
				<span class="description">All Questions</span>
			</div>
			<div class="content" v-if="getTarget">
				<div class="messageBlock" v-for="(item, i) in getTargetMessages" :key="i">
					<div class="messageBlock_info">
						<span class="messageBlock_info_id">{{ item.id }}</span>
						<span class="description">Open</span>
					</div>
					<div class="messageBlock_content">
						<span>{{ item.message }}</span>
						<div class="messageBlock_content_footer">
							<span class="description">User42, {{ item.dateCreated }}</span>
							<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" class="icon" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
						</div>
					</div>
				</div>
				<div class="messageBlock">
					<textarea class="form_field" v-model="message"></textarea>
					<input type="button" class="btnDefault" value="Отправить" @click="sendMessage()">
				</div>
			</div>
			<div class="content" v-else>
				Для начала работы создайте раздел
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
	data() {
		return {
			sectionName: "",
			message: ""
		}
	},
	computed: {
		...mapGetters(["getSections", "getTarget", "getTargetMessages"])
	},
	methods: {
		...mapActions(["addSection", "setTarget", "addMessage", "uploadSectionsFromStorage"]),
		sendSection() {
			this.addSection(this.sectionName)
			this.sectionName = ""
		},
		sendMessage() {
			this.addMessage(this.message)
			this.message = ""
		}
	},
	mounted() {
		this.uploadSectionsFromStorage()
	}
}
</script>

<style lang="scss">
%flexRowNoWrap {
	display: flex;
	flex: {
		direction: row;
		wrap: nowrap;
	}
}

%flexColumn {
	display: flex;
	flex: {
		direction: column;
	}
}

$fontDark: #335d6b;

.flexRowNoWrap {
	@extend %flexRowNoWrap;
}

body {
	margin: 0;
	font: {
		family: "Fira Sans", sans-serif;
		weight: bold;
	}
}

.btnDefault {
	background: #0085b1;
	cursor: pointer;
	color: #fff;
	padding: 10px 20px;
	transition: 0.15s ease-out;
	font: {
		size: 0.8em;
		weight: bold;
	}
	border: 0 {
		radius: 7px;
	}

	&:hover {
		background: #51badd;
	}
}

.btnDashed {
	background: none;
	padding: 5px 10px;
	color: #85969D;
	font: {
		weight: bold;
		size: 0.8em;
	}
	cursor: pointer;
	transition: 0.15s ease-out;
	border: 2px dashed #335d6b {
		radius: 7px;
	}

	&:hover {
		color: #fff;
		border: 2px dashed #51badd;
	}
}

.form_field {
	outline: none;
	box-sizing: border-box;
	width: 100%;
	height: 50px;
	margin-right: 20px;
	padding: 10px 15px;
	font: {
		size: 1em;
	}
	border: 2px dashed #335d6b {
		radius: 7px;
	}

	&:focus {
		border: 2px solid #51badd;
	}
}

.sidebar {
	z-index: 1;
	position: fixed;
	box-sizing: border-box;
	width: 350px;
	height: 100%;
	background: #05222A;
	color: #fff;
	font: {
		size: 1.2em;
	}
	padding: 10px 15px;
	overflow-y: scroll;

	&::-webkit-scrollbar {
		width: 0;
	}
	
	.form_field {
		background: rgb(6, 23, 27);
		height: 35px;
		color: #fff;
		font: {
			size: 0.9em;
		}
	}

	hr {
		border: 0;
		height: 1px;
		background: linear-gradient(90deg, #05222A, $fontDark, #05222A);
	}

	.icon {
		fill: none;
		stroke: $fontDark {
			width: 2;
		}

		&_reverse {
			fill: $fontDark;
			stroke: #05222A {
				width: 2;
			}
		}
	}

	.description {
		font-size: 1em;
		color: $fontDark;
	}

	.profile {
		@extend %flexRowNoWrap;
		justify-content: space-between;
		align-items: center;
		

		.avatar {
			width: 75px;
			border-radius: 10px;
		}

		.userInfo {
			padding: 5px 10px;
			flex-grow: 2;
		}
	}

	.menu {
		@extend %flexColumn;

		.link,
		.linkActive {
			@extend %flexRowNoWrap;
			align-items: center;
			padding: 5px 10px;
			color: #85969D;
			border-radius: 3px;
			transition: 0.15s ease-out;

			&:hover,
			&Active {
				cursor: pointer;
				color: #fff;
				background: #117FA4;

				.icon {
					stroke: rgb(37, 178, 224);
				}
			}

			.icon {
				width: 17px;
				height: 17px;
				margin-right: 7px;
			}
		}
	}
}

.mainbar {
	@extend %flexRowNoWrap;
	box-sizing: border-box;
	width: 100%;
	min-height: 100vh;
	background: #DAE8F3;
	color: rgb(41, 41, 41);
	font: {
		size: 1.2em;
	}

	.spaceLeft {
		min-width: 350px;
	}

	.icon {
		fill: none;
		stroke: #e2e2e2 {
			width: 2;
		}
	}

	.description {
		color: rgb(129, 129, 129);
		font-weight: 100;
	}

	.centralBlock {
		@extend %flexColumn;
		width: 100%;

		.higherText {
			font-size: 1.4em;
		}

		.header {
			background: #fff;
			padding: 20px 30px;
		}

		.content {
			padding: 20px 30px 0 30px;

			.messageBlock {
				@extend %flexRowNoWrap;
				background: #fff;
				border-radius: 5px;
				padding: 15px 20px;
				margin-bottom: 25px;

				&_info {
					@extend %flexColumn;
					justify-content: space-between;
					align-items: center;
					width: 85px;
					height: 130px;
					background: #eeeeee;
					border-radius: 7px;
					padding: 0 10px 10px 10px;

					&_id {
						width: 100%;
						background: #04a5db;
						color: #fff;
						text-align: center;
						padding: 5px 10px;
						border-radius: 7px;
					}
				}

				&_content {
					@extend %flexColumn;
					justify-content: space-between;
					width: 100%;
					padding: 5px 0 0 15px;

					&_footer {
						@extend %flexRowNoWrap;
						justify-content: space-between;
						align-items: center;
					}
				}
			}
		}
	}
}
</style>
