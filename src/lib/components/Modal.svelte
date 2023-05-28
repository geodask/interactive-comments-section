<script lang="ts" context="module">
  import type { ComponentProps, ComponentType, SvelteComponentTyped } from 'svelte';
  import { get, writable } from 'svelte/store';
  import { scale } from 'svelte/transition';

  type ModalConfig = {
    closeOnBackdrop?: boolean;
  };

  type Component<TComponent extends SvelteComponentTyped> = ComponentType<TComponent>;
  type Props<TComponent extends SvelteComponentTyped> = {
    [k: string]: never;
  } extends ComponentProps<TComponent>
    ? []
    : [props: ComponentProps<TComponent>];

  const modal = writable<ComponentType | undefined>(undefined);
  const modalConfig = writable<ModalConfig | undefined>(undefined);
  const modalProps = writable<Record<string, any> | undefined>(undefined);

  const openModal = <TComponent extends SvelteComponentTyped>(
    component: Component<TComponent>,
    ...props: Props<TComponent>
  ) => {
    modal.set(component);
    modalProps.set(props[0]);
  };

  const closeModal = () => {
    modal.set(undefined);
    modalProps.set(undefined);
  };

  export const useModal = (config: ModalConfig = { closeOnBackdrop: false }) => {
    modalConfig.set(config);
    return {
      openModal,
      closeModal
    };
  };

  let modalElement: HTMLElement;

  const animate = () => {
    if (!get(modalConfig)?.closeOnBackdrop) {
      modalElement.classList.add('animate-heartbeat');
      setTimeout(() => {
        modalElement.classList.remove('animate-heartbeat');
      }, 510);
    } else {
      closeModal();
    }
  };
</script>

{#if $modal}
  <div
    on:keypress={animate}
    on:click={animate}
    class="h-screen w-screen absolute top-0 left-0 bg-black opacity-50"
  />
{/if}

{#if $modal}
  <div
    bind:this={modalElement}
    transition:scale|local={{
      start: 0.8,
      duration: 200
    }}
    class="absolute bg-white w-[350px] -m-[175px] sm:w-[400px] sm:-m-[200px] left-[50%] top-[50%] p-6 rounded-md space-y-5"
  >
    <svelte:component this={$modal} {...$modalProps} />
  </div>
{/if}
