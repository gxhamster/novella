<template>
  <PageContainerScroll title="Settings">
    <div class="flex flex-col gap-5">
      <SettingsGroup title="General">
        <SettingsGroupRow title="this is the first setting">
          <ToggleButton />
        </SettingsGroupRow>
        <SettingsGroupRow title="this is the first setting">
          <SettingsPageButton title="Change" />
        </SettingsGroupRow>
        <SettingsGroupRow title="this is the first setting">
          <ToggleButton />
        </SettingsGroupRow>
      </SettingsGroup>
      <SettingsGroup title="Account">
        <SettingsGroupRow title="this is the first setting">
          <ToggleButton />
        </SettingsGroupRow>
        <SettingsGroupRow title="this is the first setting">
          <ToggleButton />
        </SettingsGroupRow>
        <SettingsGroupRow title="this is the first setting">
          <ToggleButton />
        </SettingsGroupRow>
      </SettingsGroup>
      <SettingsGroup title="Audio">
        <SettingsGroupRow title="this is the first setting">
          <ToggleButton />
        </SettingsGroupRow>
        <SettingsGroupRow title="this is the first setting">
          <ToggleButton />
        </SettingsGroupRow>
        <SettingsGroupRow title="this is the first setting">
          <ToggleButton />
        </SettingsGroupRow>
      </SettingsGroup>
    </div>
  </PageContainerScroll>
</template>

<script setup>
import PageContainerScroll from "@/components/PageContainerScroll";
import SettingsGroup from "@/components/SettingsGroup";
import ToggleButton from "@/components/ToggleButton";
import SettingsGroupRow from "@/components/SettingsGroupRow";
import SettingsPageButton from "../components/SettingsPageButton.vue";
</script>
