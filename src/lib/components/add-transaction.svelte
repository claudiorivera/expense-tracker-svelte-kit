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

export let form: SuperValidated<Infer<AddTransactionFormSchema>>;

const _form = superForm(form, {
	validators: zodClient(addTransactionFormSchema),
	autoFocusOnError: true,
});

const { form: formData, enhance } = _form;
</script>

<form
  method="POST"
  action="?/create"
  use:enhance
  class="flex flex-col items-end gap-4 rounded bg-white p-4 shadow-sm"
>
  <Form.Field form={_form} name="transactionType">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label class="flex items-center gap-2">
          Transaction Type
          <Select.Root
            type="single"
            bind:value={$formData.transactionType}
            name={props.name}
          >
            <Select.Trigger {...props} class="w-40">
              {$formData.transactionType
                ? TransactionType[$formData.transactionType]
                : "Select a Transaction Type"}
            </Select.Trigger>
            <Select.Content>
              <Select.Item value={TransactionType.Expense} label="Expense" />
              <Select.Item value={TransactionType.Income} label="Income" />
            </Select.Content>
            <Input type="hidden" name={props.name} value={$formData.transactionType} />
          </Select.Root>
        </Form.Label>
      {/snippet}
    </Form.Control>
    <Form.Description />
    <Form.FieldErrors />
  </Form.Field>
  
  <Form.Field form={_form} name="description" class="text-right">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label class="flex items-center gap-2">
          Description
          <Input class="w-40" {...props} bind:value={$formData.description}/>
        </Form.Label>
      {/snippet}
    </Form.Control>
    <Form.Description />
    <Form.FieldErrors />
  </Form.Field>
  
  <Form.Field form={_form} name="amount" class="text-right">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label class="flex items-center gap-2">
          Amount
          <Input class="w-40" {...props} bind:value={$formData.amount} type="number" step={0.01} />
        </Form.Label>
      {/snippet}
    </Form.Control>
    <Form.Description />
    <Form.FieldErrors />
  </Form.Field>
  
  <Form.Button class="w-full bg-indigo-500 hover:bg-indigo-500/80 font-bold cursor-pointer">Submit</Form.Button>
</form>