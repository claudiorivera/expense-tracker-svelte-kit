<script lang="ts">
	import {
		TransactionType,
		addTransactionFormSchema,
		type AddTransactionFormSchema,
	} from "$lib/add-transaction-form-schema";
	import * as Form from "$lib/components/ui/form";
	import type { SuperValidated } from "sveltekit-superforms";
	export let form: SuperValidated<AddTransactionFormSchema>;
</script>

<Form.Root
	method="POST"
	{form}
	schema={addTransactionFormSchema}
	let:config
	options={{
		validationMethod: "submit-only",
		resetForm: true,
		autoFocusOnError: true,
	}}
	class="flex flex-col items-center gap-4 rounded bg-white p-4 shadow"
>
	<Form.Field {config} name="transactionType">
		<Form.Item class="w-1/2 self-end">
			<Form.Select
				selected={{
					value: TransactionType.EXPENSE,
					label: "Expense",
				}}
			>
				<Form.SelectTrigger />
				<Form.SelectContent>
					<Form.SelectItem value={TransactionType.EXPENSE}
						>Expense</Form.SelectItem
					>
					<Form.SelectItem value={TransactionType.INCOME}
						>Income</Form.SelectItem
					>
				</Form.SelectContent>
			</Form.Select>
		</Form.Item>
	</Form.Field>

	<Form.Field {config} name="description">
		<Form.Item class="flex items-center gap-2 self-end">
			<Form.Label>Description</Form.Label>
			<div class="flex flex-col gap-1">
				<Form.Input autofocus />
				<Form.Validation class="h-2" />
			</div>
		</Form.Item>
	</Form.Field>

	<Form.Field {config} name="amount">
		<Form.Item class="flex items-center gap-2 self-end">
			<Form.Label>Amount</Form.Label>
			<div class="flex flex-col gap-1">
				<Form.Input type="number" step={0.01} />
				<Form.Validation class="h-2" />
			</div>
		</Form.Item>
	</Form.Field>

	<Form.Button class="w-1/2 bg-indigo-500 font-semibold text-white"
		>Submit</Form.Button
	>
</Form.Root>
