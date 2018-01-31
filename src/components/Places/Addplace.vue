<template>
	<v-dialog v-model="AddplaceDialog" max-width="500">
		<v-btn flat slot="activator">
			<v-icon left dark>add_location</v-icon>
			Add place
		</v-btn>
		<v-card>
			<v-flex xs12 v-if="error">
				<app-alert @dismissed="onDismissed" :text="error.message">
				</app-alert>
			</v-flex>
			<v-flex class="text-xs-right" xs12>
				<v-btn fab outline error @click="AddplaceDialog=false">
					<v-icon>close</v-icon>
				</v-btn>
			</v-flex>
			<v-flex class="text-xs-center" xs12>
				<p style="
					font-size:  30px;
					text-transform:  uppercase;
				">Add place</p>
			</v-flex>				
			<v-card-text>
				<v-container>
					<form @submit.prevent="onAddPlace">
						<v-layout row>
							<v-flex xs12>
								<v-text-field
								prepend-icon="mode_edit"
								name="title"
								label="Title"
								v-model="title"
								id="title"
								require></v-text-field>
							</v-flex>
						</v-layout>
						<v-layout row>
							<v-flex xs12>
								<v-text-field
								name="location"
								label="Put a label on the map"
								:value="locationString"
								prepend-icon="location_searching"
								required
								multi-line
								rows="2"
								disabled></v-text-field>
							</v-flex>
						</v-layout>
						<v-layout row>
							<v-flex xs6 offset-xs3>
								<v-btn
								success 
								block
								outline
								type="submit"
								:disabled="!formIsValid">
								Add place
								</v-btn>
							</v-flex>
						</v-layout>
					</form>
				</v-container>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
	export default {
		props: ['location'],		
		data () {
			return {
				title: '',
				date: '',
				AddplaceDialog: false
			}
		},
		computed: {
			formIsValid() {
				return this.title !== '' && 
				this.location !== {} &&
				this.location !== null &&
				this.location !== undefined
			},
			user () {
				return this.$store.getters.user
			},
			error () {
				return this.$store.getters.error
			},
			loading () {
				return this.$store.getters.loading
			},
			locationString () {
				if (this.location) {
					var string = 'Latitude: ' + this.location.lat().toString() + '\n' + 'Longitude: ' + this.location.lng().toString()
					return string
				}
			}
		},
		methods: {
			onAddPlace () {
				if (!this.formIsValid) {
					return 
				}
				const placeData = {
					title: this.title,
					date: Math.round(new Date().getTime()/1000.0),
					locationLat: this.location.lat (),
					locationLng: this.location.lng ()
				}
				this.$store.dispatch('addPlace', placeData)
				this.AddplaceDialog = false
			}
		}		
	}
</script>	