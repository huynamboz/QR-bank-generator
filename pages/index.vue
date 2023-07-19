<template>
	<div class="w-full flex justify-center pt-5 gap-5 px-5 py-5">
		<div class="w-full max-w-[1200px] flex max-md:flex-col justify-center gap-5">
			<div class="flex-[1] max-md:flex-[auto] w-full">
				<!-- <p class="font-bold text-2xl mb-5">Create vietQr</p> -->
				<code>Tạo QR chuyển khoản nhanh từ thông tin tài khoản 🪄</code>
				<div class="flex flex-col mt-3">
					<p>Bank:</p>
					<select v-model="bankId" @change="validateBankId()"
						class="border-2 border-gray-300 rounded-lg px-2 py-1">
						<option value="">Chọn ngân hàng</option>
						<option :value="item.bin" v-for="item in banks">({{ item.bin }}) {{ item.short_name }}</option>
					</select>
					<div class="h-[25px] text-rose-500">
						{{ errValidate.bankId }}
					</div>
				</div>
				<div class="flex gap-5 w-full">
					<div class="flex flex-col w-[60%]">
						<p>Stk:</p>
						<input @input="validateBankNumber()" placeholder="Số tài khoản" v-model="bankNumber" type="text"
							class="py-1 px-2 border-[1px] rounded-md">
						<div class="h-[25px] text-rose-500">
							{{ errValidate.bankNumber }}
						</div>
					</div>
					<div class="flex flex-col w-[40%]">
						<p>Số tiền:</p>
						<input @input="validateAmount()" placeholder="(không bắt buộc)" v-model="amount" type="text"
							class="py-1 px-2 border-[1px] rounded-md">
						<div class="h-[25px] text-rose-500">
							{{ errValidate.amount }}
						</div>
					</div>
				</div>
				<div class="flex flex-col">
					<p>Nội dung chuyển khoản:</p>
					<input @input="image = ''" v-model="description" type="text" placeholder="(Không bắt buộc)"
						class="py-1 px-2 border-[1px] rounded-md">
					<div class="h-[25px] text-rose-500">
						{{ errValidate.description }}
					</div>
				</div>
				<div class="flex flex-col justify-end">
					<button class="bg-[#2cb656] text-white px-7 py-1 h-fit rounded-lg" @click="createQR()">Tạo QR</button>
				</div>
			</div>
			<div class=" flex-[1] max-md:flex-[auto] flex justify-center items-center py-5 flex-col mt-5 bg-white border-[1px] max-md:border-0 rounded-lg h-fit min-h-[400px] pb-3">
				<div id="item-qr" v-if="image" class="w-fit h-fit flex flex-col items-center p-2 bg-white border-[1px] rounded-lg">
					<div class="flex flex-col w-[300px] max-md:w-full items-center">
						<div class="flex gap-1 items-center justify-center max-md:max-w-[unset]">
							<img src="../assets/images/logo.png" alt="" class="h-[30px] w-[140px] object-contain">
							<div class="h-[30px] w-[1px] bg-gray-300 mr-[5px]"></div>
							<p>{{ bankName }}</p>
						</div>
					</div>
					<div class="flex w-fit justify-center">
						<img v-if="image" :src="image" alt="" class="w-[300px] max-md:w-full object-contain">
					</div>
					<div>
						<p class="text-center text-[#2cb656] font-base text-sm">STK: {{ bankNumber }}</p>
						<p v-if="amount" class="text-center text-[#2cb656] font-base text-sm">Số tiền: {{ amount }} VND</p>
						<p v-if="description" class="text-center text-[#2cb656] font-base text-sm">Nội dung: {{ description }}</p>
					</div>
				</div>
				<div v-if="image" class="flex w-full flex justify-center mt-2 h-fit">
					<button class="bg-[#2cb656] text-white h-fit px-3 rounded-sm" @click="downImage()">Tải về</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
export default {
	layout: 'default',
	data() {
		return {
			banks: [],
			bankId: '',
			bankNumber: '',
			amount: '',
			image: '',
			description: '',
			errValidate: {
				bankId: '',
				bankNumber: '',
				amount: '',
				description: ''
			}
		}
	},
	computed: {
		bankName: function () {
			if (this.bankId == '') {
				return ''
			} else {
				return this.banks.find(item => item.bin == this.bankId).name
			}
		}
	},
	mounted() {
		this.getBanks()
	},
	methods: {
		downImage() {
			htmlToImage.toJpeg(document.getElementById('item-qr'), { quality: 0.95 })
				.then(function (dataUrl) {
					var link = document.createElement('a');
					link.download = 'my-image-name.jpeg';
					link.href = dataUrl;
					link.click();
				});
		},
		validateBankId() {
			this.image = '';
			if (this.bankId == '') {
				this.errValidate.bankId = 'Vui lòng chọn ngân hàng'
			} else {
				this.errValidate.bankId = ''
			}
		},
		validateBankNumber() {
			this.image = '';
			if (this.bankNumber == '') {
				this.errValidate.bankNumber = 'Vui lòng nhập số tài khoản'
			} else {
				this.errValidate.bankNumber = ''
			}
		},
		validateAmount() {
			this.image = '';
			if (isNaN(this.amount)) {
				this.errValidate.amount = 'Vui lòng nhập số'
			} else {
				this.errValidate.amount = ''
			}
		},
		validateDescription() {
			this.image = '';
			if (this.description == '') {
				this.errValidate.description = 'Vui lòng nhập nội dung chuyển khoản'
			} else {
				this.errValidate.description = ''
			}
		},
		getBanks() {
			this.$axios.$get('https://api.ltesletsflyhigh.com/qr/banks')
				.then(res => {
					this.banks = res.data
				})
		},
		createQR() {
			this.validateBankId();
			this.validateBankNumber();
			this.validateAmount();
			if (this.errValidate.bankId != '' || this.errValidate.bankNumber != '' || this.errValidate.amount != '' || this.errValidate.description != '') {
				return
			}
			this.$axios.$post('https://api.ltesletsflyhigh.com/qr/create-qr', {
				bankId: this.bankId,
				bankNumber: this.bankNumber,
				amount: this.amount,
				description: this.description
			})
				.then(res => {
					this.image = res.data
					console.log(res)
				})
		}
	}
}
</script>