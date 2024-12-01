<script lang="ts">
import {
	type AddTransactionFormSchema,
	TransactionType,
	addTransactionFormSchema,
} from "$lib/add-transaction-form-schema";
import * as Form from "$lib/components/ui/form";
import { Input } from "$lib/components/ui/input";
import * as Select from "$lib/components/ui/select";
import {
	type Infer,
	type SuperValidated,
	superForm,
} from "sveltekit-superforms";
import { zodClient } from "sveltekit-superforms/adapters";

type Props = {
	data: SuperValidated<Infer<AddTransactionFormSchema>>;
};

let { data }: Props = $props();

const form = superForm(data, {
	validators: zodClient(addTransactionFormSchema),
	autoFocusOnError: true,
});

const { form: formData, enhance } = form;
</script>

<form
  method="POST"
  action="?/create"
  use:enhance
  class="flex flex-col items-end gap-4 rounded bg-white p-4 shadow"
>
  <Form.Field {form} name="transactionType">
    <Form.Control>
      {#snippet children({ props })}
        <div class="flex gap-2 items-center">
          <Form.Label>Transaction Type</Form.Label>
          <Select.Root
            type="single"
            bind:value={$formData.transactionType}
            name={props.name}
          >
            <Select.Trigger {...props} class="w-40">
              {$formData.transactionType.charAt(0).toUpperCase() + $formData.transactionType.slice(1).toLowerCase()}
            </Select.Trigger>
            <Select.Content>
              <Select.Item value={TransactionType.EXPENSE} label="Expense" />
              <Select.Item value={TransactionType.INCOME} label="Income" />
            </Select.Content>
          </Select.Root>
        </div>
      {/snippet}
    </Form.Control>
  </Form.Field>

  <Form.Field {form} name="description" class="flex flex-col items-end gap-1">
    <Form.Control>
      {#snippet children({ props })}
        <div class="flex gap-2 items-center">
          <Form.Label>Description</Form.Label>
          <Input
            class="w-40"
            {...props}
            bind:value={$formData.description}
          />
        </div>
        {/snippet}
      </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Field {form} name="amount" class="flex flex-col items-end gap-1">
    <Form.Control>
      {#snippet children({ props })}
        <div class="flex gap-2 items-center">
          <Form.Label>Amount</Form.Label>
          <Input
            class="w-40"
            {...props}
            type="number"
            step={0.01}
            bind:value={$formData.amount}
          />
        </div>
        {/snippet}
    </Form.Control>
    <Form.FieldErrors />
  </Form.Field>

  <Form.Button class="w-1/2 bg-indigo-500 font-semibold text-white self-center">
    Submit
  </Form.Button>
</form>
