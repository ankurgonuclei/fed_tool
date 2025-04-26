<script lang="ts">
	import { tiles } from '$lib/stores/tiles';
	const imageUrl =
		'https://fedmobuat.federalbank.co.in:9443/imageservice/resources/static/{}_xhdpi.png';

	function getImageUrl(imageName: string): string {
		return imageUrl.replace('{}', imageName);
	}

	function handleImageError(event: Event): void {
		const img = event.target as HTMLImageElement;
		img.src = 'https://via.placeholder.com/48';
	}
</script>

<div class="container mx-auto px-4 py-8">
	<div class="mb-6">
		<a href="/" class="flex items-center text-indigo-600 hover:text-indigo-900">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="mr-2 h-5 w-5"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
					clip-rule="evenodd"
				/>
			</svg>
			Back to Home
		</a>
	</div>

	<!-- Mobile Preview -->
	<div class="mobile-preview">
		<div class="device-frame bg-blue-100">
			<div class="device-header">
				<div class="notch"></div>
			</div>
			<div class="device-content">
				<div class="space-y-4 p-4 h-full">
					{#if $tiles.length === 0}
						<div class="flex flex-col h-[calc(100vh-100px)] items-center justify-center">
							<p class="text-black text-xl">No tiles found</p>
						</div>	
					{:else}
						{#each $tiles as tile}
							<div class="rounded-2xl bg-white p-3">
								<h2 class="mb-3 text-sm font-semibold text-blue-900">{tile.displayName}</h2>
								<div class="flex snap-x snap-mandatory space-x-4 overflow-x-auto">
									<div class="w-24 flex-none snap-center">
										<div class="flex flex-col items-center p-2">
											<div class="h-8 w-8 overflow-hidden">
												<img
													src={getImageUrl(tile.imageUrl)}
													alt={tile.displayName}
													class="h-full w-full object-cover"
													on:error={handleImageError}
												/>
											</div>
											<p class="line-clamp-3 text-center text-xs text-gray-700">
												{tile.displayName}
											</p>
										</div>
									</div>
								</div>
							</div>
						{/each}
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.mobile-preview {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		background-color: #f0f0f0;
		padding: 20px;
	}

	.device-frame {
		width: 375px;
		height: 812px;
		border-radius: 40px;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
		position: relative;
		overflow: hidden;
	}

	.device-header {
		height: 30px;
		background-color: #000;
		position: relative;
	}

	.notch {
		width: 150px;
		height: 30px;
		background-color: #000;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		border-bottom-left-radius: 15px;
		border-bottom-right-radius: 15px;
	}

	.device-content {
		height: calc(100% - 30px);
		overflow-y: auto;
	}

	/* Hide scrollbar but keep functionality */
	.overflow-x-auto {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.overflow-x-auto::-webkit-scrollbar {
		display: none;
	}
</style>
