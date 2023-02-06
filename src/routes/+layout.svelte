<script lang="ts">
	import '@picocss/pico';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<nav class="container">
	<ul>
		<form method="post">
			<li>
				<a href="/">Home</a>
			</li>
			{#if !data?.user}
				<li>
					<a href="/login">Login</a>
				</li>
				<li>
					<a href="/register">Register</a>
				</li>
			{:else}
				<li>
					<button formaction="/logout" type="submit"> Logout </button>
				</li>
			{/if}
		</form>
	</ul>
</nav>
<main class="container">
	<slot><!-- optional fallback --></slot>
</main>
