<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AnimeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Summary of prepareForValidation
     */
    protected function prepareForValidation(): void
    {
        // 未チェック時、falseとしてリクエストに追加する
        if (! $this->has('is_current_season')) {
            $this->merge([
                'is_current_season' => false,
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'anime_img_path' => ['nullable', 'file', 'mimes:jpg,jpeg,png'],
            'name' => ['required', 'string', 'max:255', Rule::unique('animes', 'name')->ignore($this->route('anime'))],
            'official_site_url' => ['nullable', 'string', 'url:http,https'],
            'description' => ['nullable', 'string'],
            'genre_id' => ['required', 'integer', 'exists:genres,id'],
            'is_current_season' => ['boolean'],
        ];
    }

    /**
     * Summary of messages
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'anime_img_path.file' => '画像ファイルを選択してください',
            'anime_img_path.mimes' => 'jpg、jpeg、png形式の画像を選択してください',
            'name.required' => 'タイトルを入力してください',
            'name.string' => 'タイトルの値が不正です',
            'name.max' => 'タイトルは255文字以内で入力してください',
            'name.unique' => '入力されたタイトルは既に登録されています',
            'official_site_url.string' => 'URLの値が不正です',
            'official_site_url.url' => 'URLの値が不正です',
            'description.string' => '概要の値が不正です',
            'genre_id.required' => 'ジャンルを選択してください',
            'genre_id.integer' => 'ジャンルの値が不正です',
            'genre_id.exists' => 'ジャンルの値が存在しません',
            'is_current_season.boolean' => '放送中のチェックボックスの値が不正です',
        ];
    }
}
