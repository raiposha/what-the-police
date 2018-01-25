<template>
	<v-dialog persistent disebled v-model="signinDialog" width="300">
		<v-btn flat slot="activator">
			<v-icon left dark>lock_open</v-icon>
			Sign In
		</v-btn>
		<v-card >
			<v-flex xs12 v-if="error">
				<app-alert @dismissed="onDismissed" :text="error.message">
				</app-alert>
			</v-flex>
			<v-flex xs12>
				<v-card-title class="headline text-xs-center">
					Sign In				
				</v-card-title>				
				<v-card-text>
					<v-container>
						<form @submit.prevent="onSignin">
							<v-layout row>
								<v-flex xs12>
									<v-text-field
									name="email"
									label="Mail"
									v-model="email"
									type="email"
									require></v-text-field>
								</v-flex>
							</v-layout>
							<v-layout row>
								<v-flex xs12>
									<v-text-field
									name="password"
									label="Enter your password"
									v-model="password"
									type="password"
									require></v-text-field>
								</v-flex>
							</v-layout>
							<v-layout row>
								<v-flex xs12>
									<v-btn
									error
									@click="signinDialog = false">
									Close
									</v-btn>
									<v-btn
									success 
									type="submit"
									:disabled="loading" 
									:loading="loading">
									Sign in
									<span slot="loader" class="custom-loader">
										<v-icon light>cached</v-icon>
									</span>
									</v-btn>
								</v-flex>
							</v-layout>
						</form>
					</v-container>
				</v-card-text>				
			</v-flex>
		</v-card>
	</v-dialog>
</template>

<script>
	export default {		
		data () {
			return {
				email: '',
				password: '',
				signinDialog: false
			}
		},
		computed: {
			user () {
				return this.$store.getters.user
			},
			error () {
				return this.$store.getters.error
			},
			loading () {
				return this.$store.getters.loading
			}
		},
		watch: {
			user (value) {
				if (value !== null && value !== undefined) {
					this.$router.push('/')
				}
			}
		},
		methods: {
			onSignin () {
				this.$store.dispatch('signUserIn', {email: this.email, password: this.password})				
			},
			onDismissed () {
				this.$store.dispatch('clearError')
				this.signinDialog = false
			}
		}
	}
</script>	