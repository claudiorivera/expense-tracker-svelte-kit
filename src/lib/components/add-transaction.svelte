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

let selectedTransactionType = $derived(
	$formData.transactionType
		? {
				label:
					$formData.transactionType === TransactionType.EXPENSE
						? "Expense"
						: "Income",
				value: $formData.transactionType,
			}
		: undefined,
);
</script>

<form
  method="POST"
  use:enhance
  class="flex flex-col items-end gap-4 rounded bg-white p-4 shadow"
>
  <Form.Field {form} name="transactionType" class="flex flex-col gap-1">
    <Form.Control >
      {#snippet children({ attrs })}
            <div class="flex gap-2 items-center">
          <Form.Label>Transaction Type</Form.Label>
          <Select.Root
            selected={selectedTransactionType}
            onSelectedChange={(v) => {
              v && ($formData.transactionType = v.value);
            }}
          >
            <Select.Trigger {...attrs} class="w-40">
              <Select.Value placeholder="Select a Transaction Type" />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value={TransactionType.EXPENSE} label="Expense" />
              <Select.Item value={TransactionType.INCOME} label="Income" />
            </Select.Content>
            <Input
              type="hidden"
              name={attrs.name}
              bind:value={$formData.transactionType}
            />
          </Select.Root>
        </div>
        <Form.FieldErrors />
                {/snippet}
        </Form.Control>
  </Form.Field>

  <Form.Field {form} name="description" class="flex flex-col items-end gap-1">
    <Form.Control >
      {#snippet children({ attrs })}
            <div class="flex gap-2 items-center">
          <Form.Label>Description</Form.Label>
          <Input
            class="w-40"
            {...attrs}
            autofocus
            bind:value={$formData.description}
          />
        </div>
        <Form.FieldErrors />
                {/snippet}
        </Form.Control>
  </Form.Field>

  <Form.Field {form} name="amount" class="flex flex-col items-end gap-1">
    <Form.Control >
      {#snippet children({ attrs })}
            <div class="flex gap-2 items-center">
          <Form.Label>Amount</Form.Label>
          <Input
            class="w-40"
            {...attrs}
            type="number"
            step={0.01}
            bind:value={$formData.amount}
          />
        </div>
        <Form.FieldErrors />
                {/snippet}
        </Form.Control>
  </Form.Field>

  <Form.Button class="w-1/2 bg-indigo-500 font-semibold text-white self-center"
    >Submit</Form.Button
  >
</form>
