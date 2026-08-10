<?php

namespace App\Http\Requests;

use App\Enum\WatchingStatus;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class WatchingStatusRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'selectedValue' => ['required', 'integer', Rule::enum(WatchingStatus::class)],
        ];
    }

    public function messages(): array
    {
        return [
            'selectedValue.required' => '視聴状況を選択してください',
            'selectedValue.integer' => '視聴状況の値が不正です',
            'selectedValue.enum' => '視聴状況の選択値が存在しません',
        ];
    }
}
