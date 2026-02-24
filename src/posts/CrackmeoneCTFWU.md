# 

# Crackmeone CTF

______________________

## <u>Easy</u>

____________________

#### CryptPad

```bash
└─$ file cryptpad.exe
cryptpad.exe: PE32 executable (GUI) Intel 80386, for MS Windows, 4 sections
```

It's a windows gui app. We recognize it thanks to the API functions used to register a window class and create a Window :

#### FLRSCRNSVR.SCR

```bash
└─$ file FLRSCRNSVR.SCR
FLRSCRNSVR.SCR: PE32+ executable (GUI) x86-64, for MS Windows, 6 sections
```

It's a windows gui app. More precisely it's a screen saver app (.scr).

Static analysis :

Interesting function at : `0x140001ae0` , I renamed it in : verify_password, here is it's decompiled code :

```c
void verify_password(wchar_t *passwd)

{
  LSTATUS LVar1;
  int is_debugged;
  UINT UVar2;
  HDC dc_hdl;
  HDC pHVar3;
  HBITMAP bitmap_hdl;
  HANDLE hFindFile;
  HWND pHVar4;
  size_t pass_len;
  longlong passwd_len;
  wchar_t *passwd_buffer;
  HGDIOBJ h;
  longlong offset;
  undefined1 auStackY_af8 [32];
  undefined8 lpType;
  HKEY hkey;
  HKEY hkey2;
  DWORD buffer_len [2];
  LARGE_INTEGER pv [3];
  _WIN32_FIND_DATAW local_a88;
  wchar_t passwd_buf [256];
  WCHAR local_638 [264];
  wchar_t encrypted_key [256];
  BYTE reg_data [512];
  ulonglong local_28;
  wchar_t key;
  wchar_t pass;

  local_28 = DAT_140008000 ^ (ulonglong)auStackY_af8;
  buffer_len[1] = 0x200;
  LVar1 = RegOpenKeyExW((HKEY)0xffffffff80000001,L"Control Panel\\Desktop",0,0x20019,&hkey);
  if (LVar1 == 0) {
    LVar1 = RegQueryValueExW(hkey,L"Wallpaper",(LPDWORD)0x0,(LPDWORD)0x0,reg_data,buffer_len + 1);
    if (LVar1 == 0) {
      lpType._0_4_ = 1;
    }
    RegCloseKey(hkey);
  }
  dc_hdl = GetDC((HWND)0x0);
  pHVar3 = CreateCompatibleDC(dc_hdl);
  bitmap_hdl = CreateCompatibleBitmap(dc_hdl,1,1);
  DeleteObject(bitmap_hdl);
  DeleteDC(pHVar3);
  ReleaseDC((HWND)0x0,dc_hdl);
  LVar1 = RegOpenKeyExW((HKEY)HKLM,L"Software\\FLRSCRNSVR",0,0x20019,&hkey2);
  offset = 5;
  if (LVar1 == 0) {
    QueryPerformanceCounter(pv);
    is_debugged = anti_debug_check();
    lpType._0_4_ = is_debugged + 1;
    GetSystemMetrics(0);
    buffer_len[0] = 0x200;
    UVar2 = GetWindowsDirectoryW(local_638,0x104);
    if (UVar2 != 0) {
      wcscat_s(local_638,0x104,L"*.dll");
      hFindFile = FindFirstFileW(local_638,&local_a88);
      if (hFindFile != (HANDLE)0xffffffffffffffff) {
        FindClose(hFindFile);
      }
    }
    LVar1 = RegQueryValueExW(hkey2,L"Text",(LPDWORD)0x0,(LPDWORD)&lpType,(LPBYTE)passwd,buffer_len);
                    /* Success */
    if (LVar1 == 0) {
      passwd_len = 5;
      do {
        passwd_len = passwd_len + -1;
      } while (passwd_len != 0);
      pass_len = wcsnlen(passwd,0x100);
      if (pass_len == 0) {
        wcscpy_s(passwd,0x100,L"Crackmes.one");
      }
    }
    else {
      pHVar4 = GetDesktopWindow();
      IsWindow(pHVar4);
      wcscpy_s(passwd,0x100,L"Crackmes.one");
      dc_hdl = GetDC((HWND)0x0);
      pHVar3 = CreateCompatibleDC(dc_hdl);
      bitmap_hdl = CreateCompatibleBitmap(dc_hdl,1,1);
      DeleteObject(bitmap_hdl);
      DeleteDC(pHVar3);
      ReleaseDC((HWND)0x0,dc_hdl);
    }
    GetSystemMetrics(0);
    RegCloseKey(hkey2);
  }
  else {
    wcscpy_s(passwd,0x100,L"Crackmes.one");
  }
  passwd_len = -1;
  do {
    passwd_len = passwd_len + 1;
  } while (passwd[passwd_len] != L'\0');
  if (passwd_len == 0x19) {
    passwd_len = 5;
    do {
      passwd_len = passwd_len + -1;
    } while (passwd_len != 0);
    wcscpy_s(passwd_buf,0x100,passwd);
    lpType._0_4_ = GetSystemMetrics(0);
    encrypt_string((longlong)passwd_buf);
    pHVar4 = GetDesktopWindow();
    IsWindow(pHVar4);
    load_encrypted_registry_key(encrypted_key);
    lpType._0_4_ = GetSystemMetrics(0);
    do {
      offset = offset + -1;
    } while (offset != 0);
    passwd_buffer = passwd_buf;
    offset = (longlong)encrypted_key - (longlong)passwd_buffer;
    do {
      pass = *passwd_buffer;
      key = *(wchar_t *)((longlong)passwd_buffer + offset);
      if (pass != key) break;
      passwd_buffer = passwd_buffer + 1;
    } while (key != L'\0');
    if (pass == key) {
      h = GetStockObject(4);
      GetObjectW(h,0x10,pv);
      DAT_140008898 = 1;
    }
    else {
      dc_hdl = GetDC((HWND)0x0);
      pHVar3 = CreateCompatibleDC(dc_hdl);
      bitmap_hdl = CreateCompatibleBitmap(dc_hdl,1,1);
      DeleteObject(bitmap_hdl);
      DeleteDC(pHVar3);
      ReleaseDC((HWND)0x0,dc_hdl);
    }
  }
  else {
    LVar1 = RegOpenKeyExW((HKEY)0xffffffff80000001,L"Control Panel\\Desktop",0,0x20019,
                          (PHKEY)&lpType);
    if (LVar1 == 0) {
      RegCloseKey((HKEY)CONCAT44(lpType._4_4_,(DWORD)lpType));
    }
  }
  __security_check_cookie(local_28 ^ (ulonglong)auStackY_af8);
  return;
}
```

The password must be 25 characters long :

```c
if (lVar8 == 0x19)  // 0x19 = 25 decimal
```

The if the test is passed :

```c
wcscpy_s(passwd_buf,0x100,passwd);
encrypt_string((longlong)passwd_buf);
load_encrypted_registry_key(encrypted_key);
```

So the passwd is encrypted then compared to an encrypted key stored in a register. Let's look at `load_encrypted_registry_key` function to find out how is the secret key retrieved. The crucial part is in this line :

```c
LVar2 = RegQueryValueExW(hkey,L"Quak",(LPDWORD)0x0,&local_14,(LPBYTE)key_buffer,&buff_len);
```

the secret key is retrieved from the "*Quak*" register and if it is not found, it's replaced by a hard coded binary string :

```c
    else {
      wcscpy_s(key_buffer,0x100,L"<Qj\t\x02\a%\x030\b\x04)h$\x01$\x18kw\x0fp6\x02\x0e\v");
```

In a setup function there is :

```c
RegSetValueExW(hkey,L"Quak",0,1,"<",0x34);
```

Where "<" is actually a pointer to an array :

```python
byte_array = [ 0x3c, 0x00, 0x51, 0x00, 0x6a, 0x00, 0x09, 0x00, 0x02, 0x00, 0x07, 0x00, 0x25, 0x00, 0x03, 0x00, 0x30, 0x00, 0x08, 0x00, 0x04, 0x00, 0x29, 0x00, 0x68, 0x00, 0x24, 0x00, 0x01, 0x00, 0x24, 0x00, 0x18, 0x00, 0x6b, 0x00, 0x77, 0x00, 0x0f, 0x00, 0x70, 0x00, 0x36, 0x00, 0x02, 0x00, 0x0e, 0x00, 0x0b, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]
```

FLAG : `CMO{frogt4s7ic_r3vers1ng}` 

#### RecordPlayer

```bash
└─$ file RecordPlayer.exe 
RecordPlayer.exe: PE32+ executable (GUI) x86-64, for MS Windows, 6 sections
```

Important functions summarized :

| Adresse     | Initial name  | Renamed                |
| ----------- | ------------- | ---------------------- |
| 0x140001060 | FUN_140001060 | WinMain                |
| 0x1400032b0 | FUN_1400032b0 | MainDialog_constructor |
| 0x140002e20 | FUN_140002e20 | show_modal_dialog      |
| 0x140002e50 | FUN_140002e50 | dialog_proc            |
| 0x140003160 | FUN_140003160 | button_init            |
| 0x140002f80 | FUN_140002f80 | button_window_proc     |
| 0x140003860 | FUN_140003860 | MainDialog_OnCommand   |
| 0x140003980 | FUN_140003980 | MainDialog_OnInit      |
| 0x140002ee0 | FUN_140002ee0 | load_button_bitmaps    |
| 0x1400010c0 | FUN_1400010c0 | CSkin_constructor      |

Buttons respond to messages :

```c
// WM_MOUSEMOVE (0x200)
if (param_2 == 0x200)

// WM_LBUTTONDOWN (0x201)  
if (param_2 == 0x201)

// WM_LBUTTONUP (0x202)
if (param_2 == 0x202)

// WM_MOUSELEAVE (0x2a3)
if (param_2 == 0x2a3)
```

When a button is clicked, it sends a WM_COMMAND signal to its parent :

```c
void MainDialog_OnCommand(longlong param_1, short param_2)
{
  if (param_2 == 0x3e9) {
    // Play/Pause button
  }
  else if (param_2 == 0x3ea) {
    // About button
  }
  else if (param_2 == 0x3eb) {
    // Exit button
  }
}
```

FLAG : `CMO{y0u_g0t_r1ckr0ll3d}`

--- 

## <u>Intermediate</u>

---

#### httpd

```bash
└─$ file httpd 
httpd: ELF 64-bit LSB executable, x86-64, version 1 (FreeBSD), dynamically linked, interpreter /libexec/ld-elf.so.1, for FreeBSD 14.3, FreeBSD-style, Go BuildID=qFhGj9dLilyvUQG0jioV/pdT2CXTFFROnGyFt_iWG/4oSXKlJuQ2v7ZdSaKAaG/1odovLc3PIPvXv8LHbgL, with debug_info, not stripped
```

```c
package main

import (
 "crypto/aes"
 "crypto/cipher"
 "encoding/binary"
 "fmt"
 "os"

"github.com/google/gopacket"
"github.com/google/gopacket/pcap"

)

func init() {
 // Ouvrir l'interface réseau
 handle, err := pcap.OpenLive("re0", 1600, true, pcap.BlockForever)
 if err != nil {
 panic(err)
 }

```c
// Filtrer uniquement les paquets ICMP
err = handle.SetBPFFilter("icmp")
if err != nil {
    panic(err)
}

// Créer le packet source
packetSource := gopacket.NewPacketSource(handle, handle.LinkType())

// Boucle de capture
for packet := range packetSource.Packets() {
    data := packet.Data()

    // Vérifier la taille minimale
    if len(data) < 0x2e {
        continue
    }

    // Vérifier le magic packet
    if binary.BigEndian.Uint16(data[0x26:0x28]) != 0x1337 ||
       binary.BigEndian.Uint16(data[0x10:0x12]) != 0x20 ||
       binary.LittleEndian.Uint32(data[0x2a:0x2e]) != 0xE55FDEC6 {
        continue
    }

    // Vérifier que c'est un ICMP Echo Request
    if data[0x22] != 8 {
        continue
    }

    // Construire l'IV à partir des données du paquet
    icmpData := binary.BigEndian.Uint32(data[0x2a:0x2e])
    field := binary.BigEndian.Uint16(data[0x24:0x26])

    high := uint16(icmpData >> 16)
    low := uint16(icmpData & 0xFFFF)

    xor1 := high ^ field
    xor2 := field ^ low

    iv := make([]byte, 16)
    binary.BigEndian.PutUint16(iv[0:2], xor1)
    copy(iv[2:6], data[0x14:0x18])    // Flags|Frag|TTL|Protocol
    copy(iv[6:8], data[0x24:0x26])
    copy(iv[8:12], data[0x2a:0x2e])
    copy(iv[12:14], data[0x26:0x28])
    binary.BigEndian.PutUint16(iv[14:16], xor2)

    // Clé AES hardcodée
    key := [32]byte{
        0x51, 0xf1, 0xa5, 0x29, 0xb4, 0xdf, 0x7e, 0xc0,
        0x2a, 0x3b, 0x2f, 0x8f, 0x24, 0x3d, 0x4e, 0xb3,
        0x5a, 0xed, 0xb0, 0xcf, 0x0b, 0x9c, 0xdd, 0x8c,
        0xcd, 0xe6, 0x0e, 0xb0, 0xe9, 0x43, 0x4c, 0xc6,
    }

    // Créer le cipher AES
    block, err := aes.NewCipher(key[:])
    if err != nil {
        panic(err)
    }

    // Déchiffrer en mode CBC
    decrypted := make([]byte, 32)
    decrypter := cipher.NewCBCDecrypter(block, iv)
    decrypter.CryptBlocks(decrypted, key[:])

    // Afficher le message
    message := string(decrypted)
    fmt.Fprintln(os.Stdout, message)
}
```

In RAX at @0x00748459 : 

(gdb) x/10gxx $rax
0x822801400040f644
0x0000000000000000
0x0000000000000000
0x0000000000000000
0x0000000000000000

0x00003713c6de5fe5
0x0000000000000000
0x0000000000000000
0x0000000000000000
0x0000000000000000

And at @0x0074845e (after checksum added) => AES IV

![](C:\Users\colin\AppData\Roaming\marktext\images\2026-02-18-15-57-37-image.png)

checksum = 0x38 au lieu de 0x20

initial_checksum = 0x8fa2

après transfo : 0x6451

Trame initiale :

![](C:\Users\colin\AppData\Roaming\marktext\images\2026-02-18-17-31-11-image.png)

#### connected

```bash
└─$ file connected                
connected: ELF 64-bit LSB pie executable, x86-64, version 1 (GNU/Linux), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=98fb8f46258eb452616de7688c900efb90b7740b, for GNU/Linux 3.2.0, not stripped
```

conditions :

code size = 8

PC(6) = 0

PC(8) = 100806214

base : 0x0000555555554000

len(user_payload) < 0xf

FLAG : `CMO{secret_code_v9hcdkd2}`

#### What did you type ?

archive password : 1m_g0d_!!

fetched key from *for-ultramar.com:9999* : unsigned char bytes[] = {0x66, 0xc9, 0xc5, 0xa2, 0x1, 0x5f, 0xf2, 0xbe, 0x7, 0x5f, 0x3d, 0x43, 0x0, 0x31, 0xf5, 0x4d, 0x22, 0xf8, 0xad, 0x71, 0x94, 0x36, 0x38, 0x89, 0xa0, 0x19, 0x35, 0x9, 0x37, 0x94, 0x6d, 0x74};

usb decode resource : [USB - CTF Wiki EN](https://ctf-wiki.mahaloz.re/misc/traffic/protocols/USB/)

size of shellcode : 0x8ee0 = 36576

RDX = 0x0000020ECF51C220

AllocateVirtualMemory : 00007FFA6F5C1D40

ProtectVirtualMemory : 00007FFA6F5C2440

FreeVirtualMeMory : 00007FFA6F5C1E00

Base : 0000000A1EFFF670

Somestruct : 000000F6C5BFF940

Base2 : 0000000A1EFFF6D0 => X/R

Base shellcode : 0000016DC3A20000

Add call entry : 0000016DC3A20739

Add MZ : 0000016DC3A400F5

Protected base : 0000004CAAEFF620
