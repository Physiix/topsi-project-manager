<template>
	<div>
		<Tooltip top :content="$lang.Get('tags')">
			<v-list-tile id="tags-button" @click="">
				<v-list-tile-action>
					<v-icon style="margin-left:-2px">
						fa-tags
					</v-icon>
				</v-list-tile-action>
			</v-list-tile>
		</Tooltip>
		<FloatingDiv activator-id="tags-button" v-on:action="" width="500" dark left v-on:opened="Opened">
			<v-toolbar color="secondary" dark class="px-2 elevation-0">
				<v-text-field ref="tag_input" v-model="tag" :color="color" autofocus @keyup.enter.native="AddTag"></v-text-field>
				<v-btn color="primary" style="border-radius:0;" @click="AddTag">{{$lang.Get('add')}}</v-btn>
			</v-toolbar>
			<ColorPicker width="500" padding="20" v-model="color"></ColorPicker>
			<v-card-title v-if="tag.length > 0" class="justify-center">
				<v-chip small label :class="color">{{tag}}</v-chip>
			</v-card-title>
			<v-container>
				<div v-if="tags.length < 0"> {{$lang.Get('noTagsCreated')}}</div>
				<v-chip label v-for="(entry, index) in tags" :key="index" small :class="entry.color" close v-on:input="RemoveTag(index)">{{entry.tag}}</v-chip>
			</v-container>
		</FloatingDiv>
	</div>
</template>
<script>
import Utils from '../../../../core/Utils';

export default {
	name: 'TagsSettings',
	data() {
		return {
			tag: '',
			color: '',
			tags: []
		}
	},
	methods: {
		RemoveTag(index) {
			this.$store.dispatch('RemoveTag', this.tags[index]);
			this.UpdateTags();
		},

		AddTag() {
			this.$store.dispatch('AddTag', {
				tag: this.tag,
				color: this.color
			});
			this.tag = '';
			this.color = ''
		},

		UpdateTags() {
			this.tags = this.$store.getters.projectTags;
		},

		Opened() {
			Utils.FocusTextField(this.$refs.tag_input.$el)
		}
	},
	mounted() {
		this.UpdateTags();
	}
}
</script>

<style scoped>

</style>