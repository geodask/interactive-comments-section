<div class="bg-white shadow-sm rounded-lg p-6">
  <!-- MOBILE -->
  <div class="sm:hidden">
    <div class="flex flex-col gap-4">
      <slot name="user-tag" />
      <slot name="content" />
      <div class="flex justify-between">
        <slot name="counter" />
        <slot name="actions" />
      </div>
    </div>
  </div>

  <!-- DESKTOP -->
  <div class="hidden sm:block">
    <div class="flex items-start gap-6">
      <slot name="counter" />
      <div class="flex gap-4 flex-col grow">
        <div class="flex items-center justify-between">
          <slot name="user-tag" />
          <slot name="actions" />
        </div>
        <slot name="content" />
      </div>
    </div>
  </div>
</div>
