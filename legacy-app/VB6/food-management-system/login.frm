VERSION 5.00
Object = "{67397AA1-7FB1-11D0-B148-00A0C922E820}#6.0#0"; "MSADODC.OCX"
Begin VB.Form login3_frm 
   Appearance      =   0  'Flat
   AutoRedraw      =   -1  'True
   BackColor       =   &H80000005&
   BorderStyle     =   1  'Fixed Single
   Caption         =   "LogIn"
   ClientHeight    =   9480
   ClientLeft      =   150
   ClientTop       =   1470
   ClientWidth     =   17385
   FillColor       =   &H00FFFFFF&
   KeyPreview      =   -1  'True
   LinkTopic       =   "Form1"
   MaxButton       =   0   'False
   MinButton       =   0   'False
   Picture         =   "login.frx":0000
   ScaleHeight     =   474
   ScaleMode       =   2  'Point
   ScaleWidth      =   869.25
   WindowState     =   2  'Maximized
   Begin VB.Frame Frame2 
      Appearance      =   0  'Flat
      BackColor       =   &H000000FF&
      ForeColor       =   &H80000008&
      Height          =   735
      Left            =   9960
      TabIndex        =   10
      Top             =   7080
      Width           =   2295
      Begin VB.CommandButton Command2 
         BackColor       =   &H000000FF&
         Caption         =   "exit"
         BeginProperty Font 
            Name            =   "Bell MT"
            Size            =   15.75
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   495
         Left            =   360
         Style           =   1  'Graphical
         TabIndex        =   11
         Top             =   120
         Width           =   1695
      End
   End
   Begin MSAdodcLib.Adodc login 
      Height          =   615
      Left            =   9960
      Top             =   7200
      Width           =   2295
      _ExtentX        =   4048
      _ExtentY        =   1085
      ConnectMode     =   0
      CursorLocation  =   3
      IsolationLevel  =   -1
      ConnectionTimeout=   15
      CommandTimeout  =   30
      CursorType      =   3
      LockType        =   3
      CommandType     =   1
      CursorOptions   =   0
      CacheSize       =   50
      MaxRecords      =   0
      BOFAction       =   0
      EOFAction       =   0
      ConnectStringType=   1
      Appearance      =   1
      BackColor       =   -2147483643
      ForeColor       =   -2147483640
      Orientation     =   0
      Enabled         =   -1
      Connect         =   "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=C:\Users\ONIBUKUN\Desktop\vb class\bat\bat.mdb;Persist Security Info=False"
      OLEDBString     =   "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=C:\Users\ONIBUKUN\Desktop\vb class\bat\bat.mdb;Persist Security Info=False"
      OLEDBFile       =   ""
      DataSourceName  =   ""
      OtherAttributes =   ""
      UserName        =   ""
      Password        =   ""
      RecordSource    =   "select * from users"
      Caption         =   "login"
      BeginProperty Font {0BE35203-8F91-11CE-9DE3-00AA004BB851} 
         Name            =   "MS Sans Serif"
         Size            =   8.25
         Charset         =   0
         Weight          =   400
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      _Version        =   393216
   End
   Begin VB.CommandButton Command1 
      BackColor       =   &H00008080&
      Caption         =   "submit"
      BeginProperty Font 
         Name            =   "Bell MT"
         Size            =   15.75
         Charset         =   0
         Weight          =   700
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      Height          =   735
      Left            =   7560
      Style           =   1  'Graphical
      TabIndex        =   6
      Top             =   7200
      Width           =   2175
   End
   Begin VB.Frame Frame1 
      BackColor       =   &H00004000&
      Height          =   3975
      Left            =   6600
      TabIndex        =   1
      Top             =   3360
      Width           =   6810
      Begin VB.CheckBox show_pass_chk 
         Caption         =   "show password"
         Height          =   255
         Left            =   4440
         TabIndex        =   9
         Top             =   3000
         Width           =   1575
      End
      Begin VB.CommandButton pass_clear 
         Caption         =   "x"
         BeginProperty Font 
            Name            =   "MS Sans Serif"
            Size            =   17.25
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   615
         Left            =   5760
         TabIndex        =   8
         Top             =   2160
         Width           =   255
      End
      Begin VB.CommandButton user_clear 
         Caption         =   "x"
         BeginProperty Font 
            Name            =   "MS Sans Serif"
            Size            =   17.25
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   615
         Left            =   5880
         TabIndex        =   7
         Top             =   840
         Width           =   255
      End
      Begin VB.TextBox pass_txt 
         BeginProperty Font 
            Name            =   "Bell MT"
            Size            =   17.25
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   615
         IMEMode         =   3  'DISABLE
         Left            =   3120
         TabIndex        =   3
         Text            =   "password"
         Top             =   2160
         Width           =   2775
      End
      Begin VB.TextBox user_txt 
         BeginProperty Font 
            Name            =   "Bell MT"
            Size            =   17.25
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   615
         Left            =   3000
         TabIndex        =   2
         Text            =   "username"
         Top             =   840
         Width           =   2895
      End
      Begin VB.Label Label2 
         Caption         =   "password"
         BeginProperty Font 
            Name            =   "MS Sans Serif"
            Size            =   17.25
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   495
         Left            =   240
         TabIndex        =   5
         Top             =   2280
         Width           =   1935
      End
      Begin VB.Label Label1 
         Caption         =   "username"
         BeginProperty Font 
            Name            =   "MS Sans Serif"
            Size            =   17.25
            Charset         =   0
            Weight          =   700
            Underline       =   0   'False
            Italic          =   0   'False
            Strikethrough   =   0   'False
         EndProperty
         Height          =   735
         Left            =   360
         TabIndex        =   4
         Top             =   960
         Width           =   2055
      End
   End
   Begin VB.PictureBox Picture3 
      Align           =   4  'Align Right
      BorderStyle     =   0  'None
      Height          =   9480
      Left            =   16650
      ScaleHeight     =   9480
      ScaleWidth      =   735
      TabIndex        =   0
      Top             =   0
      Width           =   735
   End
   Begin VB.Image Image1 
      BorderStyle     =   1  'Fixed Single
      Height          =   1155
      Left            =   9480
      Picture         =   "login.frx":3548D5
      Stretch         =   -1  'True
      Top             =   1800
      Width           =   2040
   End
End
Attribute VB_Name = "login3_frm"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False

Private Sub Command1_Click()
          login.RecordSource = "select * from users where Username='" + user_txt.Text + "' and Password='" + pass_txt.Text + "'"

login.Refresh

If login.Recordset.EOF Then

MsgBox "Login failed,Try Again..!!!", vbCritical, "Please Enter correct Username and Password"

Else

MsgBox "Login Successful.", vbInformation, "Successful Attempt"
    Form3.Show


    End If
    
End Sub




Private Sub Command2_Click()
End
End Sub

Private Sub Frame1_DragDrop(Source As Control, X As Single, Y As Single)

End Sub

Private Sub Label1_Click()

End Sub

Private Sub pass_clear_Click()
pass_txt.Text = ""

End Sub

Private Sub pass_txt_GotFocus()
    If pass_txt.Text = "password" Then
        pass_txt.Text = ""
        If show_pass_chk.Value = 0 Then
            pass_txt.PasswordChar = "*"
        End If
    End If
End Sub


Private Sub pass_txt_KeyPress(KeyAscii As Integer)
         If KeyAscii = 13 Then
           Call Command1_Click
         End If
End Sub

Private Sub pass_txt_LostFocus()
        If pass_txt.Text = "" Then
           If show_pass_chk.Value = 0 Then
              pass_txt.PasswordChar = ""
              End If
           pass_txt.Text = "password"
        End If
End Sub

Private Sub show_pass_chk_Click()       ' For show Hide Password Char
     If show_pass_chk.Value = 1 Then
        pass_txt.PasswordChar = ""
    Else
        pass_txt.PasswordChar = "*"
    End If
End Sub


Private Sub user_clear_Click()
user_txt.Text = ""
End Sub

Private Sub user_txt_GotFocus()
    If user_txt.Text = "username" Then
         user_txt.Text = ""
    End If
End Sub

Private Sub user_txt_KeyPress(KeyAscii As Integer)
    If KeyAscii = 13 Then
           pass_txt.SetFocus
    End If
End Sub

Private Sub user_txt_LostFocus()
     If user_txt.Text = "" Then
         user_txt.Text = "username"
    End If
End Sub

Private Sub Form_Load()
    login.ConnectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" & App.Path & "\bat.mdb;Persist Security Info=False"
    login.RecordSource = "select * from users"
    login.Refresh
End Sub

