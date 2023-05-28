<div class="bg-white shadow-sm rounded-lg p-6">
  <!-- MOBILE -->
  <div class="sm:hidden flex flex-col gap-4">
    <slot name="edit-area" />
    <div class="flex justify-between">
      <div>
        <slot name="avatar" />
      </div>
      <slot name="action" />
    </div>
  </div>

  <!-- DESKTOP -->
  <div class="hidden sm:flex gap-4 items-start">
    <div><slot name="avatar" /></div>
    <slot name="edit-area" />
    <slot name="action" />
  </div>
</div>
