<script lang="ts">
	export let schema: object;
</script>

{@html `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`}
